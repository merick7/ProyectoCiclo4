import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {DetalleVenta} from './detalle-venta.model';
import {Cliente} from './cliente.model';
import {Vendedor} from './vendedor.model';

@model({settings: {strict: false}})
export class Venta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idVenta?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  vlrTotal: number;

  @property({
    type: 'number',
    required: true,
  })
  estado: number;

  @property({
    type: 'string',
  })
  detalleVentaId?: string;

  @hasMany(() => DetalleVenta)
  detalleVentas: DetalleVenta[];

  @hasOne(() => Cliente)
  cliente: Cliente;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @hasOne(() => Vendedor)
  vendedor: Vendedor;

  @property({
    type: 'string',
  })
  vendedorId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Venta>) {
    super(data);
  }
}

export interface VentaRelations {
  // describe navigational properties here
}

export type VentaWithRelations = Venta & VentaRelations;
