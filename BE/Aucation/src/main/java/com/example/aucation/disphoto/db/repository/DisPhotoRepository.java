package com.example.aucation.disphoto.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.aucation.disphoto.db.entity.DisPhoto;

@Repository
public interface DisPhotoRepository extends JpaRepository<DisPhoto,Long> {
	Optional<List<DisPhoto>> findByDiscount_Id(Long discountId);
}
