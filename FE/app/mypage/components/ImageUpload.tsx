import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import defaultprofile from "@/app/images/defaultprofile.png";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [images, setImages] = useState<string>('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImgFile(file);
      onImageUpload(file);
    }
  };

  return (
    <label htmlFor="img_file">
      <Image
        src={images || defaultprofile}
        width={300}
        height={300}
        alt="이미지 등록"
        className="hover:cursor-pointer h-[300px] w-[300px]"
      />
      <input
        type="file"
        id="img_file"
        accept="image/jpg, image/png, image/jpeg"
        onChange={saveImgFile}
        ref={imgRef}
        hidden
      />
    </label>
  );
};

export default ImageUpload;
