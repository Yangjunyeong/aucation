package com.example.aucation.photo.api.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.example.aucation.photo.db.PhotoStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.auction.db.repository.AuctionRepository;
import com.example.aucation.common.error.ApplicationError;
import com.example.aucation.common.error.BadRequestException;
import com.example.aucation.common.error.NotFoundException;
import com.example.aucation.photo.db.Photo;
import com.example.aucation.photo.db.repository.PhotoRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PhotoService {

	private final PhotoRepository photoRepository;

	private final AmazonS3Client amazonS3Client;

	private final AuctionRepository auctionRepository;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	final String dirName = "profile";

	public void upload(List<MultipartFile> files, String auctionUUID, boolean isBid) throws IOException {
		Auction auction = auctionRepository.findByAuctionUUID(auctionUUID).orElseThrow(()->new BadRequestException(
			ApplicationError.AWS_S3_SAVE_ERROR));

		for(MultipartFile multipartFile: files) {
			File uploadFile = convertToFile(multipartFile)
				.orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 변환에 실패했습니다."));

			String fileName = dirName + "/" + auctionUUID + "/" +" " + uploadFile.getName();

			String uploadImageUrl = putS3(uploadFile, fileName);

			removeFile(uploadFile);

			Photo profileImg = Photo.builder()
				.imgUrl(uploadImageUrl)
				.auction(auction)
				.photoStatus(isBid?PhotoStatus.AUCTION_BID_PHOTO:PhotoStatus.AUCTION_PHOTO)
				.build();
			photoRepository.save(profileImg);
		}


	}
	private String putS3(File uploadFile, String fileName) {
		amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
			.withCannedAcl(CannedAccessControlList.PublicRead));
		return amazonS3Client.getUrl(bucket, fileName).toString();
	}
	private Optional<File> convertToFile(MultipartFile file) throws IOException, FileNotFoundException {
		File uploadFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
		FileOutputStream fos = new FileOutputStream(uploadFile);
		fos.write(file.getBytes());
		fos.close();
		return Optional.of(uploadFile);
	}

	private void removeFile(File targetFile) {
		if (targetFile.exists()) {
			if (targetFile.delete()) {
				log.info("파일이 삭제되었습니다.");
			} else {
				log.info("파일이 삭제되지 않았습니다.");
			}
		}
	}

	public List<Photo> getPhoto(long auctionPk) {
		return photoRepository.findByAuctionId(auctionPk).orElseThrow(()-> new NotFoundException(ApplicationError.AWS_S3_SAVE_ERROR));
	}
}

