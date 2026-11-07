package com.examen.ferreteria.dto;

import java.math.BigDecimal;

public class ArticuloCategoriaDto {
    private String nombreArticulo;
    private String marca;
    private String categoria;
    private BigDecimal precio;
    private Integer stock;

    public ArticuloCategoriaDto(String nombreArticulo, String marca, String categoria, BigDecimal precio, Integer stock) {
        this.nombreArticulo = nombreArticulo;
        this.marca = marca;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }

    public String getNombreArticulo() { return nombreArticulo; }
    public String getMarca() { return marca; }
    public String getCategoria() { return categoria; }
    public BigDecimal getPrecio() { return precio; }
    public Integer getStock() { return stock; }
}
