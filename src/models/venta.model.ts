import {Entity, model, property} from '@loopback/repository';

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
