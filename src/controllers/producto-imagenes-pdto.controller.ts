import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Producto,
  ImagenesPdto,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoImagenesPdtoController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/imagenes-pdtos', {
    responses: {
      '200': {
        description: 'Array of Producto has many ImagenesPdto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ImagenesPdto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ImagenesPdto>,
  ): Promise<ImagenesPdto[]> {
    return this.productoRepository.imagenesPdtos(id).find(filter);
  }

  @post('/productos/{id}/imagenes-pdtos', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(ImagenesPdto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.idProducto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ImagenesPdto, {
            title: 'NewImagenesPdtoInProducto',
            exclude: ['idImagen'],
            optional: ['productoId']
          }),
        },
      },
    }) imagenesPdto: Omit<ImagenesPdto, 'idImagen'>,
  ): Promise<ImagenesPdto> {
    return this.productoRepository.imagenesPdtos(id).create(imagenesPdto);
  }

  @patch('/productos/{id}/imagenes-pdtos', {
    responses: {
      '200': {
        description: 'Producto.ImagenesPdto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ImagenesPdto, {partial: true}),
        },
      },
    })
    imagenesPdto: Partial<ImagenesPdto>,
    @param.query.object('where', getWhereSchemaFor(ImagenesPdto)) where?: Where<ImagenesPdto>,
  ): Promise<Count> {
    return this.productoRepository.imagenesPdtos(id).patch(imagenesPdto, where);
  }

  @del('/productos/{id}/imagenes-pdtos', {
    responses: {
      '200': {
        description: 'Producto.ImagenesPdto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ImagenesPdto)) where?: Where<ImagenesPdto>,
  ): Promise<Count> {
    return this.productoRepository.imagenesPdtos(id).delete(where);
  }
}
