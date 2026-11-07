package com.examen.ferreteria.repository;

import com.examen.ferreteria.dto.ClienteFacturaDto;
import com.examen.ferreteria.entity.Factura;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FacturaRepository extends JpaRepository<Factura, Integer> {

    @Query("SELECT new com.examen.ferreteria.dto.ClienteFacturaDto(c.nombre, c.apellido, c.nit, f.fechaFactura, f.total) " +
           "FROM Factura f JOIN f.idCliente c " +
           "WHERE f.estado = true " +
           "ORDER BY f.fechaFactura")
    List<ClienteFacturaDto> reporteClienteFactura();
}
