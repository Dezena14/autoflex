package com.autoflex.api.controller;

import com.autoflex.api.dto.ProductionItemDTO;
import com.autoflex.api.dto.ProductionPlanDTO;
import com.autoflex.api.service.ProductionPlanningService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductionPlanController.class)
public class ProductionPlanControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductionPlanningService service;

    @Test
    void shouldReturnProductionPlanSuccessfully() throws Exception {
        ProductionPlanDTO mockPlan = new ProductionPlanDTO();
        mockPlan.AddItem(new ProductionItemDTO("Test Product", 10, new BigDecimal("100.00")));

        when(service.calculateProductionPlan()).thenReturn(mockPlan);

        mockMvc.perform(get("/api/production-plan")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.grandTotalValue").value(100.00))
                .andExpect(jsonPath("$.productionList[0].productName").value("Test Product"))
                .andExpect(jsonPath("$.productionList[0].quantity").value(10));
    }
}
