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
import {ImagenesPdto} from '../models';
import {ImagenesPdtoRepository} from '../repositories';

export class ImagenesPdtoController {
  constructor(
    @repository(ImagenesPdtoRepository)
    public imagenesPdtoRepository : ImagenesPdtoRepository,
  ) {}

  @post('/imagenes-pdtos')
  @response(200, {
    description: 'ImagenesPdto model instance',
    content: {'application/json': {schema: getModelSchemaRef(ImagenesPdto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ImagenesPdto, {
            title: 'NewImagenesPdto',
            exclude: ['id'],
          }),
        },
      },
    })
    imagenesPdto: Omit<ImagenesPdto, 'id'>,
  ): Promise<ImagenesPdto> {
    return this.imagenesPdtoRepository.create(imagenesPdto);
  }

  @get('/imagenes-pdtos/count')
  @response(200, {
    description: 'ImagenesPdto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ImagenesPdto) where?: Where<ImagenesPdto>,
  ): Promise<Count> {
    return this.imagenesPdtoRepository.count(where);
  }

  @get('/imagenes-pdtos')
  @response(200, {
    description: 'Array of ImagenesPdto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ImagenesPdto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ImagenesPdto) filter?: Filter<ImagenesPdto>,
  ): Promise<ImagenesPdto[]> {
    return this.imagenesPdtoRepository.find(filter);
  }

  @patch('/imagenes-pdtos')
  @response(200, {
    description: 'ImagenesPdto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ImagenesPdto, {partial: true}),
        },
      },
    })
    imagenesPdto: ImagenesPdto,
    @param.where(ImagenesPdto) where?: Where<ImagenesPdto>,
  ): Promise<Count> {
    return this.imagenesPdtoRepository.updateAll(imagenesPdto, where);
  }

  @get('/imagenes-pdtos/{id}')
  @response(200, {
    description: 'ImagenesPdto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ImagenesPdto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ImagenesPdto, {exclude: 'where'}) filter?: FilterExcludingWhere<ImagenesPdto>
  ): Promise<ImagenesPdto> {
    return this.imagenesPdtoRepository.findById(id, filter);
  }

  @patch('/imagenes-pdtos/{id}')
  @response(204, {
    description: 'ImagenesPdto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ImagenesPdto, {partial: true}),
        },
      },
    })
    imagenesPdto: ImagenesPdto,
  ): Promise<void> {
    await this.imagenesPdtoRepository.updateById(id, imagenesPdto);
  }

  @put('/imagenes-pdtos/{id}')
  @response(204, {
    description: 'ImagenesPdto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() imagenesPdto: ImagenesPdto,
  ): Promise<void> {
    await this.imagenesPdtoRepository.replaceById(id, imagenesPdto);
  }

  @del('/imagenes-pdtos/{id}')
  @response(204, {
    description: 'ImagenesPdto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.imagenesPdtoRepository.deleteById(id);
  }
}
