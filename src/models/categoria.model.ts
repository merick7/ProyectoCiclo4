import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';

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

  @hasMany(() => Producto)
  productos: Producto[];
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
