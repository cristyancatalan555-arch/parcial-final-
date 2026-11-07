import { useRef, useState } from 'react';
import {
  buscarArticulos, reporteArticuloCategoria, reporteClienteFactura,
  reporteDetalle, reporteVentasCategoria,
} from '../services/reportesService';
import { exportarExcel, exportarPdf } from '../services/exportar';
import type { Reporte } from '../services/exportar';

type Formato = 'pdf' | 'excel';

const articulo = { nombre: 'Artículo', ancho: 38 };
const marca = { nombre: 'Marca', ancho: 24 };
const categoria = { nombre: 'Categoría', ancho: 32 };
const precio = { nombre: 'Precio (Q)', ancho: 16, decimales: true };
const stock = { nombre: 'Stock', ancho: 12 };
const cliente = { nombre: 'Cliente', ancho: 32 };
const fecha = { nombre: 'Fecha', ancho: 24 };
const cantidad = { nombre: 'Cantidad', ancho: 14 };
const fechaLocal = (valor: string) => new Date(valor).toLocaleString('es-GT');

async function cargarArticulosPorNombre(filtro: string): Promise<Reporte> {
  const datos = await buscarArticulos(filtro);
  return {
    titulo: 'Artículos por nombre', archivo: 'reporte_articulos_nombre',
    filtro: filtro || 'Todos los activos', columnas: [articulo, marca, precio, stock],
    filas: datos.map(a => [a.nombre, a.marca, a.precio, a.stock]),
  };
}

const reportes = [
  {
    numero: '02', titulo: 'Artículos con categoría',
    descripcion: 'Artículo, marca, categoría, precio y stock.',
    async cargar(): Promise<Reporte> {
      const datos = await reporteArticuloCategoria();
      return {
        titulo: 'Artículos con su categoría', archivo: 'reporte_articulos_categoria',
        columnas: [articulo, marca, categoria, precio, stock],
        filas: datos.map(a => [a.nombreArticulo, a.marca, a.categoria, a.precio, a.stock]),
      };
    },
  },
  {
    numero: '03', titulo: 'Facturas por cliente', descripcion: 'Cliente, NIT, fecha y total.',
    async cargar(): Promise<Reporte> {
      const datos = await reporteClienteFactura();
      return {
        titulo: 'Facturas por cliente', archivo: 'reporte_facturas_cliente',
        columnas: [cliente, { nombre: 'NIT', ancho: 18 }, fecha,
          { nombre: 'Total (Q)', ancho: 18, decimales: true }],
        filas: datos.map(f => [`${f.nombre} ${f.apellido}`, f.nit, fechaLocal(f.fechaFactura), f.total]),
      };
    },
  },
  {
    numero: '04', titulo: 'Detalle de facturas', descripcion: 'Detalle completo y total general.',
    async cargar(): Promise<Reporte> {
      const datos = await reporteDetalle();
      return {
        titulo: 'Detalle de facturas', archivo: 'reporte_detalle_facturas', total: true,
        columnas: [fecha, cliente, articulo, cantidad, precio,
          { nombre: 'Precio unitario (Q)', ancho: 22, decimales: true },
          { nombre: 'Subtotal (Q)', ancho: 18, decimales: true }],
        filas: datos.map(d => [fechaLocal(d.fechaFactura), d.nombreCliente, d.nombreArticulo,
          d.cantidad, d.precio, d.precioUnitario, d.subtotal]),
      };
    },
  },
  {
    numero: '05', titulo: 'Ventas por categoría',
    descripcion: 'Unidades y total vendido en facturas activas.',
    async cargar(): Promise<Reporte> {
      const datos = await reporteVentasCategoria();
      return {
        titulo: 'Ventas por categoría', archivo: 'reporte_ventas_categoria', total: true,
        columnas: [categoria, { nombre: 'Unidades vendidas', ancho: 24 },
          { nombre: 'Total vendido (Q)', ancho: 22, decimales: true }],
        filas: datos.map(v => [v.categoria, v.cantidadVendida, v.totalVendido]),
      };
    },
  },
];

export default function Reportes() {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [ocupado, setOcupado] = useState(false);

  async function exportar(cargar: () => Promise<Reporte>, formato: Formato) {
    setOcupado(true);
    setMensaje('Generando...');
    try {
      const reporte = await cargar();
      await (formato === 'pdf' ? exportarPdf(reporte) : exportarExcel(reporte));
      setMensaje('Archivo generado correctamente.');
    } catch (error) {
      setMensaje(error instanceof Error ? error.message : 'No se pudo generar el reporte.');
    } finally {
      setOcupado(false);
    }
  }

  function botones(alExportar: (formato: Formato) => void) {
    return <div className="actions">
      <button type="button" disabled={ocupado} onClick={() => alExportar('pdf')}>Exportar PDF</button>
      <button type="button" className="excel" disabled={ocupado} onClick={() => alExportar('excel')}>
        Exportar Excel
      </button>
    </div>;
  }

  return (
    <main>
      <header>
        <div className="brand">
          <div className="logo">RF</div>
          <div>
            <h1>Centro de reportes</h1>
            <p>Consulta y exportación de información · Ferretería</p>
          </div>
        </div>
        <div className="badge">FINAL B</div>
      </header>
      {mensaje && <div className="msg" role="status">{mensaje}</div>}
      <section className="grid">
        <article>
          <span className="num">REPORTE 01</span>
          <h2>Artículos por nombre</h2>
          <p>Filtra artículos activos por nombre.</p>
          {botones(() => { setMensaje(''); dialogo.current?.showModal(); })}
        </article>
        {reportes.map(reporte => (
          <article key={reporte.numero}>
            <span className="num">REPORTE {reporte.numero}</span>
            <h2>{reporte.titulo}</h2>
            <p>{reporte.descripcion}</p>
            {botones(formato => exportar(reporte.cargar, formato))}
          </article>
        ))}
      </section>
      <dialog ref={dialogo} aria-labelledby="titulo-filtro">
        <h2 id="titulo-filtro">Artículos por nombre</h2>
        <label htmlFor="nombre">Nombre del artículo</label>
        <input id="nombre" autoFocus value={nombre} maxLength={65}
          onChange={evento => setNombre(evento.target.value)} placeholder="Ej. martillo" />
        {botones(formato => exportar(() => cargarArticulosPorNombre(nombre.trim()), formato))}
        {mensaje && <p role="status">{mensaje}</p>}
        <form method="dialog"><button className="secondary">Cerrar</button></form>
      </dialog>
    </main>
  );
}
