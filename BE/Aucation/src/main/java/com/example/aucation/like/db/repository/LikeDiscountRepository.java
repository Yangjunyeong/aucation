package com.example.aucation.like.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.aucation.discount.db.entity.Discount;
import com.example.aucation.like.db.entity.LikeDiscount;
import com.example.aucation.member.db.entity.Member;

@Repository
public interface LikeDiscountRepository extends JpaRepository<LikeDiscount, Long> {
	Optional<LikeDiscount> findByDiscountAndMember(Discount discount, Member member);
}
