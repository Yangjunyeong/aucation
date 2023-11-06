package com.example.aucation_chat.auction.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;



import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
// @AttributeOverrides({
// 	@AttributeOverride(name = "id",column = @Column(name="auction_pk")),
// 	@AttributeOverride(name="createdAt",column = @Column(name="auction_created_at"))
// })
public class Auction{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "auction_pk")
	private	long auctionPk;

	@Column(name = "auctionuuid")
	private String auctionUUID;
}
