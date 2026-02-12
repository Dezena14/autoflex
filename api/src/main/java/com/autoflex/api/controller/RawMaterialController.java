package com.autoflex.api.controller;

import com.autoflex.api.dto.RawMaterialDTO;
import com.autoflex.api.dto.UpdateStockDTO;
import com.autoflex.api.model.RawMaterial;
import com.autoflex.api.service.RawMaterialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/raw-materials")
public class RawMaterialController {

    private final RawMaterialService service;

    public RawMaterialController(RawMaterialService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<RawMaterialDTO>> list() {
        List<RawMaterialDTO> dtos = service.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<RawMaterialDTO> create(@RequestBody RawMaterial rawMaterial) {
        RawMaterial saved = service.save(rawMaterial);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId())
                .toUri();
        return ResponseEntity.created(uri).body(convertToDTO(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RawMaterialDTO> updateStock(
            @PathVariable Long id,
            @RequestBody UpdateStockDTO dto
    ) {
        RawMaterial entity = service.updateStock(id, dto.getStockQuantity());
        return ResponseEntity.ok(convertToDTO(entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    private RawMaterialDTO convertToDTO(RawMaterial entity) {
        return new RawMaterialDTO(
                entity.getId(),
                entity.getName(),
                entity.getStockQuantity()
        );
    }
}
