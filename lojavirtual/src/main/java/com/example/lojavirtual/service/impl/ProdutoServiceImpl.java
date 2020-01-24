package com.example.lojavirtual.service.impl;

import com.example.lojavirtual.domain.Produto;
import com.example.lojavirtual.repository.ProdutoRepository;
import com.example.lojavirtual.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProdutoServiceImpl implements ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    public Produto create(Produto produto) {
        return produtoRepository.save(produto);
    }

    @Override
    public Produto findById(Long idProduto) {
        return produtoRepository.findById(idProduto).orElse(null);
    }

    @Override
    public List<Produto> findAll() {
        return this.produtoRepository.findAll();
    }

    @Override
    public void delete(Produto produto) {
        this.produtoRepository.delete(produto);
    }
}
