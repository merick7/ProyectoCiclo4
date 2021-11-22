import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Categoria extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idCategoria?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcionCat: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Categoria>) {
    super(data);
  }
}

export interface CategoriaRelations {
  // describe navigational properties here
}

export type CategoriaWithRelations = Categoria & CategoriaRelations;
