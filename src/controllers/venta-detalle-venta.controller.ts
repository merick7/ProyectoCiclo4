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
  Venta,
  DetalleVenta,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaDetalleVentaController {
  constructor(
    @repository(VentaRepository) protected ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/detalle-ventas', {
    responses: {
      '200': {
        description: 'Array of Venta has many DetalleVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleVenta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DetalleVenta>,
  ): Promise<DetalleVenta[]> {
    return this.ventaRepository.detalleVentas(id).find(filter);
  }

  @post('/ventas/{id}/detalle-ventas', {
    responses: {
      '200': {
        description: 'Venta model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleVenta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Venta.prototype.idVenta,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVenta, {
            title: 'NewDetalleVentaInVenta',
            exclude: ['idDetalle'],
            optional: ['ventaId']
          }),
        },
      },
    }) detalleVenta: Omit<DetalleVenta, 'idDetalle'>,
  ): Promise<DetalleVenta> {
    return this.ventaRepository.detalleVentas(id).create(detalleVenta);
  }

  @patch('/ventas/{id}/detalle-ventas', {
    responses: {
      '200': {
        description: 'Venta.DetalleVenta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVenta, {partial: true}),
        },
      },
    })
    detalleVenta: Partial<DetalleVenta>,
    @param.query.object('where', getWhereSchemaFor(DetalleVenta)) where?: Where<DetalleVenta>,
  ): Promise<Count> {
    return this.ventaRepository.detalleVentas(id).patch(detalleVenta, where);
  }

  @del('/ventas/{id}/detalle-ventas', {
    responses: {
      '200': {
        description: 'Venta.DetalleVenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleVenta)) where?: Where<DetalleVenta>,
  ): Promise<Count> {
    return this.ventaRepository.detalleVentas(id).delete(where);
  }
}
