package com.example.aucation_chat.member.db.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Member")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
// @AttributeOverrides({
// 	@AttributeOverride(name = "id", column = @Column(name = "member_pk")),
// 	@AttributeOverride(name="createdAt",column = @Column(name="member_created_at")),
// 	@AttributeOverride(name="lastModifiedAt",column = @Column(name="member_update_at"))
// })
public class Member{
	@Id
	private long member_pk;

	@Column(unique = true)
	private String memberId;

	@Column
	private String memberPw;

	@Column(unique = true)
	private String memberEmail;

	private int memberPoint;
	private String memberNickname;
	private String memberBanned;
	private String memberRefresh;
	private String memberFCM;

	// @Embedded
	// private Address address;
	//
	// @Enumerated(EnumType.STRING)
	// private SocialType socialType;
	//
	// @Column
	// private Role memberRole;

	@Column
	private String imageURL;

	// @OneToOne
	// @JoinColumn(name = "shop_pk")
	// private Shop shop;

	@Builder
	public Member(long member_pk, String memberId, String memberPw, String memberEmail, int memberPoint,
		String memberNickname, String memberBanned, String memberRefresh, String imageURL) {
		this.member_pk = member_pk;
		this.memberId = memberId;
		this.memberPw = memberPw;
		this.memberEmail = memberEmail;
		this.memberPoint = memberPoint;
		this.memberNickname = memberNickname;
		this.memberBanned = memberBanned;
		this.memberRefresh = memberRefresh;
		this.imageURL = imageURL;
	}

	@Builder
	// public Member(Long id, LocalDateTime createdAt, Long createdBy, LocalDateTime lastModifiedAt,
	// 	Long lastModifiedBy, boolean isDeleted, String memberId, String memberPw, String memberEmail,Role memberRole,SocialType socialType,String memberNickname,String imageURL) {
	// 	super(id, createdAt, createdBy, lastModifiedAt, lastModifiedBy, isDeleted);
	// 	this.memberId = memberId;
	// 	this.memberPw = memberPw;
	// 	this.memberEmail = memberEmail;
	// 	this.memberRole = memberRole;
	// 	this.socialType = socialType;
	// 	this.imageURL = imageURL;
	// }



	public void updateRefreshToken(String updateRefreshToken) {
		this.memberRefresh = updateRefreshToken;
	}
	public void updatePoint(int point) {
		this.memberPoint=point;
	}

	public int updatePlusPoint(int count) {
		this.memberPoint+=count;
		return this.memberPoint;
	}
}
