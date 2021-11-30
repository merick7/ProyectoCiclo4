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
  Cliente,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaClienteController {
  constructor(
    @repository(VentaRepository) protected ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Venta has one Cliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente> {
    return this.ventaRepository.cliente(id).get(filter);
  }

  @post('/ventas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Venta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Venta.prototype.idVenta,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInVenta',
            exclude: ['idCliente'],
            optional: ['ventaId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'idCliente'>,
  ): Promise<Cliente> {
    return this.ventaRepository.cliente(id).create(cliente);
  }

  @patch('/ventas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Venta.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.ventaRepository.cliente(id).patch(cliente, where);
  }

  @del('/ventas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Venta.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.ventaRepository.cliente(id).delete(where);
  }
}
