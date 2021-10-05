package com.test;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

@Getter
@Setter
public class Calculation {
    @NotNull(message = "{calculation.valueA.notNull}")
    @Positive(message = "{calculation.valueA.positive}")
    private BigDecimal valueA;
    @NotNull(message = "{calculation.valueB.notNull}")
    @Positive(message = "{calculation.valueB.positive}")
    private BigDecimal valueB;
}
