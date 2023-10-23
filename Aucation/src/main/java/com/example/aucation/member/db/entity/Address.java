package com.example.aucation.member.db.entity;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Address {

	private String zipcode;
	private String streetAdr;
	private String detailAdr;

}
