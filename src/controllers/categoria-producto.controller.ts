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
  Categoria,
  Producto,
} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaProductoController {
  constructor(
    @repository(CategoriaRepository) protected categoriaRepository: CategoriaRepository,
  ) { }

  @get('/categorias/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Categoria has many Producto',
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
    return this.categoriaRepository.productos(id).find(filter);
  }

  @post('/categorias/{id}/productos', {
    responses: {
      '200': {
        description: 'Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Categoria.prototype.idCategoria,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInCategoria',
            exclude: ['idProducto'],
            optional: ['categoriaId']
          }),
        },
      },
    }) producto: Omit<Producto, 'idProducto'>,
  ): Promise<Producto> {
    return this.categoriaRepository.productos(id).create(producto);
  }

  @patch('/categorias/{id}/productos', {
    responses: {
      '200': {
        description: 'Categoria.Producto PATCH success count',
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
    return this.categoriaRepository.productos(id).patch(producto, where);
  }

  @del('/categorias/{id}/productos', {
    responses: {
      '200': {
        description: 'Categoria.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.categoriaRepository.productos(id).delete(where);
  }
}
