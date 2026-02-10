package com.autoflex.api.controller;

import com.autoflex.api.dto.ProductionPlanDTO;
import com.autoflex.api.service.ProductionPlanningService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/production-plan")
public class ProductionPlanController {

    private final ProductionPlanningService service;

    public ProductionPlanController(ProductionPlanningService service) {
        this.service = service;
    }

    @GetMapping
    public ProductionPlanDTO getPlan() {
        return service.calculateProductionPlan();
    }
}
