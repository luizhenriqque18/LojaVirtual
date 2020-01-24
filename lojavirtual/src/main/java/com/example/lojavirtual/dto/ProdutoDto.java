package com.example.lojavirtual.dto;

import com.example.lojavirtual.domain.Produto;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public class ProdutoDto {

    @JsonIgnore
    private Long id;

    @NotBlank(message = "Descrição não poder ser vazio")
    private String descricao;

    @NotNull(message = "Valor não poder ser vazio")
    private BigDecimal valor;

    public ProdutoDto() {
    }

    public ProdutoDto(Long id, @NotBlank(message = "Descrição não poder ser vazio") String descricao, @NotBlank(message = "Valor não poder ser vazio") BigDecimal valor) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Produto convertDtoParaProduto(ProdutoDto produtoDto){
        return new Produto(produtoDto.getDescricao(), produtoDto.getValor());
    }

    public ProdutoDto convertProdutoParaDto(Produto produto){
        return new ProdutoDto(produto.getId(), produto.getDescricao(), produto.getValor());
    }

    public List<ProdutoDto> convertProdutoParaListProdutoDto(List<Produto> produtoList){
        List<ProdutoDto> contaDtos = produtoList.stream()
                .map(produto -> new ProdutoDto(produto.getId(), produto.getDescricao(), produto.getValor()))
                .collect(Collectors.toList());
        return contaDtos;
    }
}
