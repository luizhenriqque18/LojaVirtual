package com.example.lojavirtual.service;

import com.example.lojavirtual.domain.Produto;

import java.util.List;

public interface ProdutoService {
    Produto create(Produto produto);
    Produto findById(Long idProduto);
    List<Produto> findAll();
    void delete(Produto produto);
}
