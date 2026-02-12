package com.autoflex.api.controller;

import com.autoflex.api.dto.UpdateStockDTO;
import com.autoflex.api.model.RawMaterial;
import com.autoflex.api.service.RawMaterialService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RawMaterialController.class)
class RawMaterialControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private RawMaterialService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldCreateRawMaterialAndReturn201() throws Exception {
        RawMaterial input = new RawMaterial();
        input.setName("Steel");
        input.setStockQuantity(100);

        RawMaterial saved = new RawMaterial();
        saved.setId(1L);
        saved.setName("Steel");
        saved.setStockQuantity(100);

        when(service.save(any(RawMaterial.class))).thenReturn(saved);

        mockMvc.perform(post("/api/raw-materials")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Steel"));
    }

    @Test
    void shouldUpdateStockAndReturn200() throws Exception {
        UpdateStockDTO dto = new UpdateStockDTO();
        dto.setStockQuantity(500);

        RawMaterial updated = new RawMaterial();
        updated.setId(1L);
        updated.setName("Steel");
        updated.setStockQuantity(500);

        when(service.updateStock(eq(1L), eq(500))).thenReturn(updated);

        mockMvc.perform(put("/api/raw-materials/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stockQuantity").value(500));
    }

    @Test
    void shouldDeleteMaterialAndReturn204() throws Exception {
        doNothing().when(service).delete(1L);

        mockMvc.perform(delete("/api/raw-materials/1"))
                .andExpect(status().isNoContent());
    }
}
