package com.examen.ferreteria.dto;

import java.math.BigDecimal;
import java.util.Date;

public class FacturaDetalleReporteDto {
    private Date fechaFactura;
    private String nombreCliente;
    private String nombreArticulo;
    private Integer cantidad;
    private BigDecimal precio;
    private BigDecimal precioUnitario;
    private BigDecimal subtotal;

    public FacturaDetalleReporteDto(Date fechaFactura, String nombreCliente, String nombreArticulo,
                                    Integer cantidad, BigDecimal precio, BigDecimal precioUnitario,
                                    BigDecimal subtotal) {
        this.fechaFactura = fechaFactura;
        this.nombreCliente = nombreCliente;
        this.nombreArticulo = nombreArticulo;
        this.cantidad = cantidad;
        this.precio = precio;
        this.precioUnitario = precioUnitario;
        this.subtotal = subtotal;
    }

    public Date getFechaFactura() { return fechaFactura; }
    public String getNombreCliente() { return nombreCliente; }
    public String getNombreArticulo() { return nombreArticulo; }
    public Integer getCantidad() { return cantidad; }
    public BigDecimal getPrecio() { return precio; }
    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public BigDecimal getSubtotal() { return subtotal; }
}
