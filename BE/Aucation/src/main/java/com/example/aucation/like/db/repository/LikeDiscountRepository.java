package com.example.aucation.like.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.aucation.discount.db.entity.Discount;
import com.example.aucation.like.db.entity.LikeDiscount;
import com.example.aucation.member.db.entity.Member;

@Repository
public interface LikeDiscountRepository extends JpaRepository<LikeDiscount, Long> {
	Optional<LikeDiscount> findByDiscountAndMember(Discount discount, Member member);

	boolean existsByDiscountAndMember(Discount discount, Member member);

	@Query("SELECT COUNT(ld) FROM LikeDiscount ld WHERE ld.discount = :discount AND ld.member = :member")
	int countByDiscountAndMember(@Param("discount") Discount discount, @Param("member") Member member);

	@Modifying
	@Query("DELETE FROM LikeDiscount r WHERE r.discount.id = :discount")
	void delete(Long discount);
}
