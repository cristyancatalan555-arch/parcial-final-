import type {Articulo,ArticuloCategoria,ClienteFactura,FacturaDetalle,VentasCategoria} from '../types/reportes';
const API='http://localhost:8080';
async function get<T>(url:string):Promise<T>{const r=await fetch(API+url);if(!r.ok)throw new Error(`Error HTTP ${r.status}`);return r.json();}
export const buscarArticulos=(nombre:string)=>get<Articulo[]>(`/articulos/mostrarActivosFiltro?nombre=${encodeURIComponent(nombre)}`);
export const reporteArticuloCategoria=()=>get<ArticuloCategoria[]>('/articulos/reporteArticuloCategoria');
export const reporteClienteFactura=()=>get<ClienteFactura[]>('/clientes/reporteClienteFactura');
export const reporteDetalle=()=>get<FacturaDetalle[]>('/clientes/reporteClienteFacturaDetalle');
export const reporteVentasCategoria=()=>get<VentasCategoria[]>('/categorias/reporteVentasCategoria');
