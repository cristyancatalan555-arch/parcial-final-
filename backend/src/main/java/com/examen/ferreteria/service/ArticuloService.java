package com.examen.ferreteria.service;

import com.examen.ferreteria.dto.ArticuloCategoriaDto;
import com.examen.ferreteria.dto.ArticuloFiltroDto;
import com.examen.ferreteria.repository.ArticuloRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ArticuloService {
    private final ArticuloRepository articuloRepository;

    public ArticuloService(ArticuloRepository articuloRepository) {
        this.articuloRepository = articuloRepository;
    }

    public List<ArticuloFiltroDto> mostrarActivosFiltro(String nombre) {
        return articuloRepository.mostrarActivosFiltro(nombre);
    }

    public List<ArticuloCategoriaDto> reporteArticuloCategoria() {
        return articuloRepository.reporteArticuloCategoria();
    }
}
