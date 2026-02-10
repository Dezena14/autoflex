package com.autoflex.api.service;

import com.autoflex.api.dto.ProductionPlanDTO;
import com.autoflex.api.model.Product;
import com.autoflex.api.model.ProductComposition;
import com.autoflex.api.model.RawMaterial;
import com.autoflex.api.repository.ProductRepository;
import com.autoflex.api.repository.RawMaterialRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class ProductionPlanningServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private RawMaterialRepository rawMaterialRepository;

    @InjectMocks
    private ProductionPlanningService service;

    @Test
    void shouldPrioritizeExpensiveProducts() {
        RawMaterial resin = new RawMaterial();
        resin.setId(1L);
        resin.setName("Polypropylene Resin");
        resin.setStockQuantity(100);

        Product dashboard = new Product();
        dashboard.setId(1L);
        dashboard.setName("Car Dashboard Panel");
        dashboard.setPrice(new BigDecimal("500.00"));

        ProductComposition dashboardComp = new ProductComposition();
        dashboardComp.setRawMaterial(resin);
        dashboardComp.setQuantityNeeded(50);
        dashboard.setComposition(List.of(dashboardComp));

        Product cup = new Product();
        cup.setId(2L);
        cup.setName("Disposable Cup");
        cup.setPrice(new BigDecimal("1.00"));

        ProductComposition cupComp = new ProductComposition();
        cupComp.setRawMaterial(resin);
        cupComp.setQuantityNeeded(1);
        cup.setComposition(List.of(cupComp));

        when(rawMaterialRepository.findAll()).thenReturn(new ArrayList<>(List.of(resin)));
        when(productRepository.findAll()).thenReturn(new ArrayList<>(List.of(cup, dashboard)));

        ProductionPlanDTO plan = service.calculateProductionPlan();

        assertEquals(1, plan.getProductionList().size(), "Should only produce the expensive item");
        assertEquals("Car Dashboard Panel", plan.getProductionList().getFirst().getProductName());
        assertEquals(2, plan.getProductionList().getFirst().getQuantity());

        assertEquals(new BigDecimal("1000.00"), plan.getGrandTotalValue());
    }

    @Test
    void shouldProduceNothingWhenStockIsInsufficient() {
        RawMaterial resin = new RawMaterial();
        resin.setId(1L);
        resin.setName("Polypropylene Resin");
        resin.setStockQuantity(5);

        Product dashboard = new Product();
        dashboard.setId(1L);
        dashboard.setPrice(new BigDecimal("100.00"));

        ProductComposition comp = new ProductComposition();
        comp.setRawMaterial(resin);
        comp.setQuantityNeeded(10);
        dashboard.setComposition(List.of(comp));

        // Mocks
        when(rawMaterialRepository.findAll()).thenReturn(new ArrayList<>(List.of(resin)));
        when(productRepository.findAll()).thenReturn(new ArrayList<>(List.of(dashboard)));

        ProductionPlanDTO plan = service.calculateProductionPlan();

        assertEquals(0, plan.getProductionList().size(), "Should produce nothing");
        assertEquals(BigDecimal.ZERO, plan.getGrandTotalValue());
    }
}
