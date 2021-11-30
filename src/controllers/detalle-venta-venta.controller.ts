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
  Venta,
} from '../models';
import {DetalleVentaRepository} from '../repositories';

export class DetalleVentaVentaController {
  constructor(
    @repository(DetalleVentaRepository) protected detalleVentaRepository: DetalleVentaRepository,
  ) { }

  @get('/detalle-ventas/{id}/venta', {
    responses: {
      '200': {
        description: 'DetalleVenta has one Venta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Venta),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Venta>,
  ): Promise<Venta> {
    return this.detalleVentaRepository.venta(id).get(filter);
  }

  @post('/detalle-ventas/{id}/venta', {
    responses: {
      '200': {
        description: 'DetalleVenta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Venta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DetalleVenta.prototype.idDetalle,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {
            title: 'NewVentaInDetalleVenta',
            exclude: ['idVenta'],
            optional: ['detalleVentaId']
          }),
        },
      },
    }) venta: Omit<Venta, 'idVenta'>,
  ): Promise<Venta> {
    return this.detalleVentaRepository.venta(id).create(venta);
  }

  @patch('/detalle-ventas/{id}/venta', {
    responses: {
      '200': {
        description: 'DetalleVenta.Venta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {partial: true}),
        },
      },
    })
    venta: Partial<Venta>,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.detalleVentaRepository.venta(id).patch(venta, where);
  }

  @del('/detalle-ventas/{id}/venta', {
    responses: {
      '200': {
        description: 'DetalleVenta.Venta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.detalleVentaRepository.venta(id).delete(where);
  }
}
