import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Producto} from './producto.model';
import {Venta} from './venta.model';

@model({settings: {strict: false}})
export class DetalleVenta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idDetalle?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadProducto: number;

  @hasMany(() => Producto)
  productos: Producto[];

  @hasOne(() => Venta)
  venta: Venta;

  @property({
    type: 'string',
  })
  ventaId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DetalleVenta>) {
    super(data);
  }
}

export interface DetalleVentaRelations {
  // describe navigational properties here
}

export type DetalleVentaWithRelations = DetalleVenta & DetalleVentaRelations;
