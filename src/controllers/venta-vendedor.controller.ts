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
  Vendedor,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaVendedorController {
  constructor(
    @repository(VentaRepository) protected ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/vendedor', {
    responses: {
      '200': {
        description: 'Venta has one Vendedor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vendedor),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vendedor>,
  ): Promise<Vendedor> {
    return this.ventaRepository.vendedor(id).get(filter);
  }

  @post('/ventas/{id}/vendedor', {
    responses: {
      '200': {
        description: 'Venta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vendedor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Venta.prototype.idVenta,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedor, {
            title: 'NewVendedorInVenta',
            exclude: ['idVendedor'],
            optional: ['ventaId']
          }),
        },
      },
    }) vendedor: Omit<Vendedor, 'idVendedor'>,
  ): Promise<Vendedor> {
    return this.ventaRepository.vendedor(id).create(vendedor);
  }

  @patch('/ventas/{id}/vendedor', {
    responses: {
      '200': {
        description: 'Venta.Vendedor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedor, {partial: true}),
        },
      },
    })
    vendedor: Partial<Vendedor>,
    @param.query.object('where', getWhereSchemaFor(Vendedor)) where?: Where<Vendedor>,
  ): Promise<Count> {
    return this.ventaRepository.vendedor(id).patch(vendedor, where);
  }

  @del('/ventas/{id}/vendedor', {
    responses: {
      '200': {
        description: 'Venta.Vendedor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vendedor)) where?: Where<Vendedor>,
  ): Promise<Count> {
    return this.ventaRepository.vendedor(id).delete(where);
  }
}
