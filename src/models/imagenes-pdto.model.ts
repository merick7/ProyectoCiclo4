import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class ImagenesPdto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idImagen?: string;

  @property({
    type: 'string',
    required: true,
  })
  rutaImagen: string;

  @property({
    type: 'string',
    required: true,
  })
  tituloImagen: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcionImagen: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ImagenesPdto>) {
    super(data);
  }
}

export interface ImagenesPdtoRelations {
  // describe navigational properties here
}

export type ImagenesPdtoWithRelations = ImagenesPdto & ImagenesPdtoRelations;
