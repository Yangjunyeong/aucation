package com.example.aucation.common.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RangeValueCalculator {

    public static int calculateValue(int input) {
        int[] ranges = {100, 500, 1000, 2500, 5000, 10000, 50000, 100000, 1000000,10000000,100000000,100000000};
        int[] bounds = {1000, 5000, 10000, 25000, 50000, 100000, 500000, 1000000,10000000,100000000,1000000000};

        for (int i = 0; i < ranges.length; i++) {
            if (input <= bounds[i]) {
                return ranges[i];
            }
        }

        return 0; // 범위에 속하지 않는 경우 기본값 또는 오류 처리를 수행할 수 있습니다.
    }
}
