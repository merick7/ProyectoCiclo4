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
  DetalleVenta,
  Producto,
} from '../models';
import {DetalleVentaRepository} from '../repositories';

export class DetalleVentaProductoController {
  constructor(
    @repository(DetalleVentaRepository) protected detalleVentaRepository: DetalleVentaRepository,
  ) { }

  @get('/detalle-ventas/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of DetalleVenta has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.detalleVentaRepository.productos(id).find(filter);
  }

  @post('/detalle-ventas/{id}/productos', {
    responses: {
      '200': {
        description: 'DetalleVenta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DetalleVenta.prototype.idDetalle,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInDetalleVenta',
            exclude: ['idProducto'],
            optional: ['detalleVentaId']
          }),
        },
      },
    }) producto: Omit<Producto, 'idProducto'>,
  ): Promise<Producto> {
    return this.detalleVentaRepository.productos(id).create(producto);
  }

  @patch('/detalle-ventas/{id}/productos', {
    responses: {
      '200': {
        description: 'DetalleVenta.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.detalleVentaRepository.productos(id).patch(producto, where);
  }

  @del('/detalle-ventas/{id}/productos', {
    responses: {
      '200': {
        description: 'DetalleVenta.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.detalleVentaRepository.productos(id).delete(where);
  }
}
