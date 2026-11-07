package com.examen.ferreteria.repository;

import com.examen.ferreteria.dto.ArticuloCategoriaDto;
import com.examen.ferreteria.dto.ArticuloFiltroDto;
import com.examen.ferreteria.entity.Articulo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArticuloRepository extends JpaRepository<Articulo, Integer> {

    @Query("SELECT new com.examen.ferreteria.dto.ArticuloFiltroDto(a.idArticulo, a.nombre, a.marca, a.precio, a.stock) " +
           "FROM Articulo a WHERE a.estado = true AND LOWER(a.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')) " +
           "ORDER BY a.nombre")
    List<ArticuloFiltroDto> mostrarActivosFiltro(@Param("nombre") String nombre);

    @Query("SELECT new com.examen.ferreteria.dto.ArticuloCategoriaDto(a.nombre, a.marca, c.nombre, a.precio, a.stock) " +
           "FROM Articulo a JOIN a.idCategoria c " +
           "WHERE a.estado = true " +
           "ORDER BY c.nombre, a.nombre")
    List<ArticuloCategoriaDto> reporteArticuloCategoria();
}
