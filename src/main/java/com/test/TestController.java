package com.test;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("{cnpj}")
    public Address getAddress(@PathVariable String cnpj) {
        return Address.builder()
                .country("Brasil")
                .state("Parana")
                .city("Curitiba")
                .street("Av Rep. da Argentina")
                .number("1532")
                .postalCode("80240210")
                .region("Agua Verde")
                .complement("de 826/827 a 2079/2080")
                .build();
    }

    @PostMapping
    public CalculationResult calculation(@RequestBody @Valid Calculation calculation) {
        final BigDecimal valueA = Optional.ofNullable(calculation.getValueA()).orElse(BigDecimal.ZERO).setScale(2, RoundingMode.HALF_UP);
        final BigDecimal valueB = Optional.ofNullable(calculation.getValueB()).orElse(BigDecimal.ZERO).setScale(2, RoundingMode.HALF_UP);
        return CalculationResult.builder()
                .average(valueA.add(valueB).divide(new BigDecimal("2"), RoundingMode.HALF_UP).setScale(2, RoundingMode.HALF_UP))
                .build();
    }
}
