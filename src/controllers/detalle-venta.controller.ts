import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DetalleVenta} from '../models';
import {DetalleVentaRepository} from '../repositories';

export class DetalleVentaController {
  constructor(
    @repository(DetalleVentaRepository)
    public detalleVentaRepository : DetalleVentaRepository,
  ) {}

  @post('/detalle-ventas')
  @response(200, {
    description: 'DetalleVenta model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetalleVenta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVenta, {
            title: 'NewDetalleVenta',
            exclude: ['id'],
          }),
        },
      },
    })
    detalleVenta: Omit<DetalleVenta, 'id'>,
  ): Promise<DetalleVenta> {
    return this.detalleVentaRepository.create(detalleVenta);
  }

  @get('/detalle-ventas/count')
  @response(200, {
    description: 'DetalleVenta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetalleVenta) where?: Where<DetalleVenta>,
  ): Promise<Count> {
    return this.detalleVentaRepository.count(where);
  }

  @get('/detalle-ventas')
  @response(200, {
    description: 'Array of DetalleVenta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetalleVenta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetalleVenta) filter?: Filter<DetalleVenta>,
  ): Promise<DetalleVenta[]> {
    return this.detalleVentaRepository.find(filter);
  }

  @patch('/detalle-ventas')
  @response(200, {
    description: 'DetalleVenta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVenta, {partial: true}),
        },
      },
    })
    detalleVenta: DetalleVenta,
    @param.where(DetalleVenta) where?: Where<DetalleVenta>,
  ): Promise<Count> {
    return this.detalleVentaRepository.updateAll(detalleVenta, where);
  }

  @get('/detalle-ventas/{id}')
  @response(200, {
    description: 'DetalleVenta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetalleVenta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetalleVenta, {exclude: 'where'}) filter?: FilterExcludingWhere<DetalleVenta>
  ): Promise<DetalleVenta> {
    return this.detalleVentaRepository.findById(id, filter);
  }

  @patch('/detalle-ventas/{id}')
  @response(204, {
    description: 'DetalleVenta PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVenta, {partial: true}),
        },
      },
    })
    detalleVenta: DetalleVenta,
  ): Promise<void> {
    await this.detalleVentaRepository.updateById(id, detalleVenta);
  }

  @put('/detalle-ventas/{id}')
  @response(204, {
    description: 'DetalleVenta PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detalleVenta: DetalleVenta,
  ): Promise<void> {
    await this.detalleVentaRepository.replaceById(id, detalleVenta);
  }

  @del('/detalle-ventas/{id}')
  @response(204, {
    description: 'DetalleVenta DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detalleVentaRepository.deleteById(id);
  }
}
