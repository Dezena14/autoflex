package com.autoflex.api.config;

import com.autoflex.api.model.Product;
import com.autoflex.api.model.ProductComposition;
import com.autoflex.api.model.RawMaterial;
import com.autoflex.api.repository.ProductRepository;
import com.autoflex.api.repository.RawMaterialRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    @Profile("!test")
    CommandLineRunner initDatabase(ProductRepository productRepository, RawMaterialRepository rawMaterialRepository) {
        return args -> {
            if (rawMaterialRepository.count() > 0) {
                return;
            }

            RawMaterial ppResin = new RawMaterial();
            ppResin.setName("Polypropylene Pellets");
            ppResin.setStockQuantity(200);
            rawMaterialRepository.save(ppResin);

            RawMaterial pigment = new RawMaterial();
            pigment.setName("Red Masterbatch");
            pigment.setStockQuantity(50);
            rawMaterialRepository.save(pigment);

            Product gardenChair = new Product();
            gardenChair.setName("Garden Chair");
            gardenChair.setPrice(new BigDecimal("120.00"));

            ProductComposition chairBody = new ProductComposition();
            chairBody.setProduct(gardenChair);
            chairBody.setRawMaterial(ppResin);
            chairBody.setQuantityNeeded(5);

            gardenChair.setComposition(List.of(chairBody));
            productRepository.save(gardenChair);

            Product plantPot = new Product();
            plantPot.setName("Small Plant Pot");
            plantPot.setPrice(new BigDecimal("15.00"));

            ProductComposition potBody = new ProductComposition();
            potBody.setProduct(plantPot);
            potBody.setRawMaterial(ppResin);
            potBody.setQuantityNeeded(1);

            plantPot.setComposition(List.of(potBody));
            productRepository.save(plantPot);

            System.out.println("Database seeded with data!");
        };
    }
}
