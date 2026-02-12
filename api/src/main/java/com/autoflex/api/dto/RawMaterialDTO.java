package com.autoflex.api.dto;

import lombok.Data;

@Data
public class RawMaterialDTO {

    private Long id;
    private String name;
    private Integer stockQuantity;

    public RawMaterialDTO(Long id, String name, Integer stockQuantity) {
        this.id = id;
        this.name = name;
        this.stockQuantity = stockQuantity;
    }
}
