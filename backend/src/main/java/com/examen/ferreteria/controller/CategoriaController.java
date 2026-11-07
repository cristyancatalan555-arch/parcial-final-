package com.examen.ferreteria.controller;

import com.examen.ferreteria.dto.VentasCategoriaDTO;
import com.examen.ferreteria.service.FacturaService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {
    private final FacturaService facturaService;

    public CategoriaController(FacturaService facturaService) {
        this.facturaService = facturaService;
    }

    @GetMapping("/reporteVentasCategoria")
    public List<VentasCategoriaDTO> reporteVentasCategoria() {
        return facturaService.reporteVentasCategoria();
    }
}
