package com.autoflex.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductionPlanDTO {

    private List<ProductionItemDTO> productionList = new ArrayList<>();
    private BigDecimal grandTotalValue = BigDecimal.ZERO;

    public void AddItem (ProductionItemDTO item) {
        this.productionList.add(item);
        this.grandTotalValue = this.grandTotalValue.add(item.getTotalValue());
    }
}
