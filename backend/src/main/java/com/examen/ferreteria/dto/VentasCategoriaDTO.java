package com.examen.ferreteria.dto;

import java.math.BigDecimal;

public record VentasCategoriaDTO(String categoria, Long cantidadVendida, BigDecimal totalVendido) {
}
