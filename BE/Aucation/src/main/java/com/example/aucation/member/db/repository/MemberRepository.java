package com.example.aucation.member.db.repository;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.aucation.member.db.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>,MemberRepositoryCustom  {

	@Query("SELECT c FROM Member c WHERE c.memberId = :MemberId")
	Optional<Member> findByMemberId(String MemberId);

	boolean existsByMemberNickname(String memberNickname);

	Optional<Member> findByMemberEmail(String userEmail);

	boolean existsByMemberEmail(String memberEmail);

	boolean existsByMemberId(String memberId);
}
