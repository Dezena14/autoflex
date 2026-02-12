package com.autoflex.api.service;

import com.autoflex.api.model.Product;
import com.autoflex.api.model.ProductComposition;
import com.autoflex.api.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository repository;

    @InjectMocks
    private ProductService service;

    @Test
    void shouldSetBackReferenceInCompositionWhenSaving() {
        Product product = new Product();
        product.setName("Chair");

        ProductComposition composition = new ProductComposition();

        product.setComposition(List.of(composition));

        when(repository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Product savedProduct = service.save(product);

        assertEquals(product, savedProduct.getComposition().getFirst().getProduct());
        verify(repository).save(product);
    }
}
