package com.autoflex.api.service;

import com.autoflex.api.dto.ProductionItemDTO;
import com.autoflex.api.dto.ProductionPlanDTO;
import com.autoflex.api.model.Product;
import com.autoflex.api.model.ProductComposition;
import com.autoflex.api.model.RawMaterial;
import com.autoflex.api.repository.ProductRepository;
import com.autoflex.api.repository.RawMaterialRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductionPlanningService {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;


    public ProductionPlanningService(ProductRepository productRepository, RawMaterialRepository rawMaterialRepository) {
        this.productRepository = productRepository;
        this.rawMaterialRepository = rawMaterialRepository;
    }

    // Calculates the production plan prioritizing products with the highest selling price
    // Simulates stock consumption in memory to ensure resources are not over-allocated.
    @Transactional(readOnly = true)
    public ProductionPlanDTO calculateProductionPlan() {
        List<Product> allProducts = productRepository.findAll();
        List<RawMaterial> allMaterials = rawMaterialRepository.findAll();

        allProducts.sort(Comparator.comparing(Product::getPrice).reversed());

        Map<Long, Integer> inventorySimulation = allMaterials.stream().collect(Collectors.toMap(RawMaterial::getId, RawMaterial::getStockQuantity));

        ProductionPlanDTO plan = new ProductionPlanDTO();

        for (Product product : allProducts) {
            int maxProducible = calculateMaxUnits(product, inventorySimulation);

            if (maxProducible > 0) {
                deductMaterials(product, maxProducible, inventorySimulation);

                BigDecimal totalValue = product.getPrice().multiply(BigDecimal.valueOf(maxProducible));
                plan.AddItem(new ProductionItemDTO(product.getName(), maxProducible, totalValue));
            }
        }
        return plan;
    }

    private int calculateMaxUnits(Product product, Map<Long, Integer> inventory) {
        if (product.getComposition().isEmpty()) return 0;

        int maxUnits = Integer.MAX_VALUE;

        for (ProductComposition comp : product.getComposition()) {
            Long materialId = comp.getRawMaterial().getId();
            int neededPerUnit = comp.getQuantityNeeded();
            int availableStock = inventory.getOrDefault(materialId, 0);

            if (neededPerUnit > 0) {
                int possibleWithThisMaterial = availableStock / neededPerUnit;
                maxUnits = Math.min(maxUnits, possibleWithThisMaterial);
            }
        }
        return maxUnits == Integer.MAX_VALUE ? 0 : maxUnits;
    }

    private void deductMaterials(Product product, int quantity, Map<Long,Integer> inventory) {
      for (ProductComposition comp : product.getComposition()) {
          Long materialId = comp.getRawMaterial().getId();
          int totalNeeded = comp.getQuantityNeeded() * quantity;

          if (inventory.containsKey(materialId)) {
              int currentStock = inventory.get(materialId);
              inventory.put(materialId, currentStock - totalNeeded);
          }

      }
    }
}
