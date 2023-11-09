package com.example.aucation.member.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class StreetResponse {

	private String city;
	private String zip;
	private String street;

}
