package com.autoflex.api.repository;

import com.autoflex.api.model.Product;
import com.autoflex.api.model.ProductComposition;
import com.autoflex.api.model.RawMaterial;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    @Test
    void shouldSaveProductWithComposition() {

        // Creates and saves a raw material
        RawMaterial plastic = new RawMaterial();
        plastic.setName("Plastic");
        plastic.setStockQuantity(100);
        rawMaterialRepository.save(plastic);

        // Creates a product
        Product bottle = new Product();
        bottle.setName("Water Bottle");
        bottle.setPrice(new BigDecimal("5.50"));

        // Creates a composition
        ProductComposition composition = new ProductComposition();
        composition.setProduct(bottle);
        composition.setRawMaterial(plastic);
        composition.setQuantityNeeded(2);

        // Adds the composition to the product
        bottle.setComposition(List.of(composition));

        // Saves the product
        Product savedProduct = productRepository.save(bottle);

        // Validates
        assertThat(savedProduct.getId()).isNotNull();
        assertThat(savedProduct.getComposition()).hasSize(1);
        assertThat(savedProduct.getComposition().getFirst().getRawMaterial().getName()).isEqualTo("Plastic");

    }
}
