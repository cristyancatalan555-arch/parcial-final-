package com.examen.ferreteria.service;

import com.examen.ferreteria.dto.ClienteFacturaDto;
import com.examen.ferreteria.dto.FacturaDetalleReporteDto;
import com.examen.ferreteria.dto.VentasCategoriaDTO;
import com.examen.ferreteria.repository.FacturaDetalleRepository;
import com.examen.ferreteria.repository.FacturaRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class FacturaService {
    private final FacturaRepository facturaRepository;
    private final FacturaDetalleRepository facturaDetalleRepository;

    public FacturaService(FacturaRepository facturaRepository, FacturaDetalleRepository facturaDetalleRepository) {
        this.facturaRepository = facturaRepository;
        this.facturaDetalleRepository = facturaDetalleRepository;
    }

    public List<ClienteFacturaDto> reporteClienteFactura() {
        return facturaRepository.reporteClienteFactura();
    }

    public List<FacturaDetalleReporteDto> reporteClienteFacturaDetalle() {
        return facturaDetalleRepository.reporteClienteFacturaDetalle();
    }

    public List<VentasCategoriaDTO> reporteVentasCategoria() {
        return facturaDetalleRepository.reporteVentasCategoria();
    }
}
