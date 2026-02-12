package com.autoflex.api.service;

import com.autoflex.api.model.RawMaterial;
import com.autoflex.api.repository.RawMaterialRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RawMaterialServiceTest {

    @Mock
    private RawMaterialRepository repository;

    @InjectMocks
    private RawMaterialService service;

    @Test
    void shouldUpdateStockSuccessfully() {
        RawMaterial existingMaterial = new RawMaterial();
        existingMaterial.setId(1L);
        existingMaterial.setStockQuantity(10);

        when(repository.findById(1L)).thenReturn(Optional.of(existingMaterial));
        when(repository.save(any(RawMaterial.class))).thenAnswer(invocation -> invocation.getArgument(0));

        RawMaterial updated = service.updateStock(1L, 50);

        assertEquals(50, updated.getStockQuantity());
        verify(repository).save(existingMaterial);
    }

    @Test
    void shouldThrowExceptionWhenUpdatingNonExistentMaterial() {

        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.updateStock(99L, 50));
        verify(repository, never()).save(any());
    }

    @Test
    void shouldDeleteMaterialSuccessfully() {

        when(repository.existsById(1L)).thenReturn(true);

        service.delete(1L);

        verify(repository).deleteById(1L);
    }

    @Test
    void shouldThrowExceptionWhenDeletingNonExistentMaterial() {

        when(repository.existsById(99L)).thenReturn(false);

        assertThrows(RuntimeException.class, () -> service.delete(99L));
        verify(repository, never()).deleteById(any());
    }
}
