package com.example.lojavirtual.repository;

import com.example.lojavirtual.domain.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
