package com.test;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    private String postalCode;
    private String street;
    private String number;
    private String region;
    private String complement;
    private String city;
    private String state;
    private String country;
}
