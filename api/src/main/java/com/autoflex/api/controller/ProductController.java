package com.autoflex.api.controller;

import com.autoflex.api.model.Product;
import com.autoflex.api.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Product> list() {
        return repository.findAll();
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        if (product.getComposition() != null) {
            product.getComposition().forEach(comp -> comp.setProduct(product));
        }
        return repository.save(product);
    }
}
