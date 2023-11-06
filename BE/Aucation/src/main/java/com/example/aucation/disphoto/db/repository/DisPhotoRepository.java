package com.example.aucation.disphoto.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.aucation.disphoto.db.entity.DisPhoto;

@Repository
public interface DisPhotoRepository extends JpaRepository<DisPhoto,Long> {
}
