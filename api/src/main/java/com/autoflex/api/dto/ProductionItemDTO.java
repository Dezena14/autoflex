package com.autoflex.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ProductionItemDTO {

    private String productName;
    private Integer quantity;
    private BigDecimal totalValue;
}
