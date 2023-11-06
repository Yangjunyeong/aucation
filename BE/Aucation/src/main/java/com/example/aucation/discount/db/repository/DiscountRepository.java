package com.example.aucation.discount.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.aucation.discount.db.entity.Discount;

@Repository
public interface DiscountRepository extends JpaRepository<Discount,Long> {
	Optional<Discount> findByDiscountUUID(String discountUUID);
}
