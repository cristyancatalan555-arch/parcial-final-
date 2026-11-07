export interface Articulo { idArticulo:number; estado:boolean; nombre:string; marca:string; precio:number; stock:number; }
export interface ArticuloCategoria { nombreArticulo:string; marca:string; categoria:string; precio:number; stock:number; }
export interface ClienteFactura { nombre:string; apellido:string; nit:string; fechaFactura:string; total:number; }
export interface FacturaDetalle { fechaFactura:string; nombreCliente:string; nombreArticulo:string; cantidad:number; precio:number; precioUnitario:number; subtotal:number; }

export interface VentasCategoria {
  categoria: string;
  cantidadVendida: number;
  totalVendido: number;
}
