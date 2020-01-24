package com.example.lojavirtual.controller;

import com.example.lojavirtual.domain.Produto;
import com.example.lojavirtual.dto.ProdutoDto;
import com.example.lojavirtual.response.Response;
import com.example.lojavirtual.service.ProdutoService;
import com.example.lojavirtual.service.impl.ProdutoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("api/produto")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoServiceImpl produtoService;

    @PostMapping("create")
    public ResponseEntity<Response<ProdutoDto>> create(@Valid @RequestBody ProdutoDto produtoDto, BindingResult result){

        if (result.hasErrors()){
            List<String> list = result.getAllErrors()
                    .stream()
                    .map( error -> error.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(new Response<ProdutoDto>(null, list));
        }

        Produto produto = produtoDto.convertDtoParaProduto(produtoDto);

        produtoService.create(produto);

        return ResponseEntity.ok(new Response<ProdutoDto>(new ProdutoDto().convertProdutoParaDto(produto), null));
    }

    @PutMapping("update")
    public ResponseEntity<Response<ProdutoDto>> update(
            @RequestParam("idProduto") Long idProduto,
            @Valid @RequestBody ProdutoDto produtoDto, BindingResult result){

        List<String> list = new ArrayList<String>();

        System.err.println(result.hasErrors());
        if (result.hasErrors()){
            list = result.getAllErrors()
                    .stream()
                    .map( error -> error.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(new Response<ProdutoDto>(null, list));
        }

        Produto produto = this.produtoService.findById(idProduto);

        if (produto == null){
            list.add("Gasto não existe!!!");
            return ResponseEntity.badRequest().body(new Response<ProdutoDto>(null, null));
        }

        produto.setDescricao(produtoDto.getDescricao());
        produto.setValor(produtoDto.getValor());

        this.produtoService.create(produto);

        return ResponseEntity.ok(new Response<ProdutoDto>(new ProdutoDto().convertProdutoParaDto(produto), null));
    }

    @GetMapping("list")
    public ResponseEntity<Response<List<ProdutoDto>>> list(){
        List<Produto> produto = this.produtoService.findAll();

        return ResponseEntity.ok(new Response<List<ProdutoDto>>(
                new ProdutoDto().convertProdutoParaListProdutoDto(produto), null));
    }

    @DeleteMapping("delete/{idProduto}")
    public ResponseEntity<Response<String>> delete(@PathVariable("idProduto") Long idProduto){

        List<String> list = new ArrayList<String>();

        Produto produto = this.produtoService.findById(idProduto);

        if (produto == null){
            list.add("Produto não existe!!!");
            return ResponseEntity.badRequest().body(new Response<String>(null, list));
        }

        this.produtoService.delete(produto);

        return ResponseEntity.ok(new Response<String>("Sucesses", null));
    }
}
