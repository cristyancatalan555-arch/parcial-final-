package com.examen.ferreteria.controller;

import com.examen.ferreteria.dto.ClienteFacturaDto;
import com.examen.ferreteria.dto.FacturaDetalleReporteDto;
import com.examen.ferreteria.service.FacturaService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {
    private final FacturaService facturaService;

    public ClienteController(FacturaService facturaService) {
        this.facturaService = facturaService;
    }

    @GetMapping("/reporteClienteFactura")
    public List<ClienteFacturaDto> reporteClienteFactura() {
        return facturaService.reporteClienteFactura();
    }

    @GetMapping("/reporteClienteFacturaDetalle")
    public List<FacturaDetalleReporteDto> reporteClienteFacturaDetalle() {
        return facturaService.reporteClienteFacturaDetalle();
    }
}
