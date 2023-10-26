package com.example.aucation.common.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ApplicationError {
    VERIFICATION_CODE_NOT_EQUAL(HttpStatus.BAD_REQUEST, "C001", "인증번호가 일치하지 않습니다."),
    INVALID_FORMAT(HttpStatus.BAD_REQUEST, "C002", "잘못된 양식입니다."),
    INVALID_AUTHORITY(HttpStatus.BAD_REQUEST, "C003", "잘못된 권한입니다."),
    WRONG_ACCESS(HttpStatus.BAD_REQUEST, "C004", "잘못된 접근입니다."),
    INVALID_TOKEN_TYPE(HttpStatus.BAD_REQUEST, "C005", "Token 타입이 올바르지 않습니다."),
    MAIL_SEND_FAIL(HttpStatus.INTERNAL_SERVER_ERROR, "C006", "메일 전송 요청에 실패했습니다."),
    INVALID_ACCESS_TOKEN(HttpStatus.BAD_REQUEST, "C007", "Access Token이 유효하지 않습니다."),
    INVALID_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "C008", "Refresh Token이 유효하지 않습니다."),

    UNAUTHORIZED_MEMBER(HttpStatus.UNAUTHORIZED, "U001", "인증되지 않은 사용자입니다."),
    FORBIDDEN_MEMBER(HttpStatus.FORBIDDEN, "U002", "권한이 없는 사용자입니다."),
    MEMBER_NOT_FOUND(HttpStatus.BAD_REQUEST, "U003", "사용자를 찾을 수 없습니다."),
    DUPLICATE_USERNAME(HttpStatus.BAD_REQUEST, "U004", "해당 아이디가 이미 존재합니다."),
    DUPLICATE_NICKNAME(HttpStatus.BAD_REQUEST, "U005", "해당 닉네임이 이미 존재합니다."),
    NOT_EQUAL_ID_OR_PASSWORD(HttpStatus.BAD_REQUEST, "U006", "아이디 또는 비밀번호가 일치하지 않습니다."),

    CHATTING_ROOM_NOT_FOUND(HttpStatus.BAD_REQUEST, "C001", "채팅방을 찾을 수 없습니다."),

    FILE_NOT_EXIST(HttpStatus.BAD_REQUEST, "F001", "파일이 존재하지 않습니다."),
    BAD_MEMBER(HttpStatus.BAD_REQUEST, "U010", "비정상 사용자입니다."),
    AWS_S3_SAVE_ERROR(HttpStatus.BAD_REQUEST, "A001", "S3 파일 업로드를 실패했습니다."),
    AWS_S3_DELETE_ERROR(HttpStatus.BAD_REQUEST, "A002", "S3 파일 삭제를 실패했습니다."),
    AWS_REKOGNITION_ERROR(HttpStatus.BAD_REQUEST, "A003", "REKOGNITION 에러가 발생했습니다."),
    DUPLICATE_USERID(HttpStatus.BAD_REQUEST, "U006","해당 아이디가 이미 존재합니다"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S001", "서버 내부 에러가 발생했습니다."),
    DUPLICATE_MEMBER_EMAIL(HttpStatus.BAD_REQUEST,"U015","이메일이 중복했습니다");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
