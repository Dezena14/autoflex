package com.autoflex.api.service;

import com.autoflex.api.model.RawMaterial;
import com.autoflex.api.repository.RawMaterialRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RawMaterialService {

    private final RawMaterialRepository repository;

    public RawMaterialService(RawMaterialRepository repository) {
        this.repository = repository;
    }

    public List<RawMaterial> findAll() {
        return repository.findAll();
    }

    public RawMaterial save(RawMaterial rawMaterial) {
        return repository.save(rawMaterial);
    }

    public RawMaterial updateStock (Long id, Integer newQuantity) {
        return repository.findById(id)
                .map(material -> {
                    material.setStockQuantity(newQuantity);
                    return repository.save(material);
                })
                .orElseThrow(() -> new RuntimeException("Material not found with id: " + id));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Material not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
