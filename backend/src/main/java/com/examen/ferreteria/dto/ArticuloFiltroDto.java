package com.examen.ferreteria.dto;

import java.math.BigDecimal;

public class ArticuloFiltroDto {
    private Integer idArticulo;
    private String nombre;
    private String marca;
    private BigDecimal precio;
    private Integer stock;

    public ArticuloFiltroDto(Integer idArticulo, String nombre, String marca, BigDecimal precio, Integer stock) {
        this.idArticulo = idArticulo;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.stock = stock;
    }

    public Integer getIdArticulo() { return idArticulo; }
    public String getNombre() { return nombre; }
    public String getMarca() { return marca; }
    public BigDecimal getPrecio() { return precio; }
    public Integer getStock() { return stock; }
}
