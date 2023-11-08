package com.example.aucation.discount.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.aucation.discount.db.entity.DiscountHistory;

@Repository
public interface DiscountHistoryRepository extends JpaRepository<DiscountHistory,Long> {
	Optional<DiscountHistory> findByDiscountId(Long id);

	boolean existsByDiscountId(Long id);
}
