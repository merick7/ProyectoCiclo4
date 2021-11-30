import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ImagenesPdto,
  Producto,
} from '../models';
import {ImagenesPdtoRepository} from '../repositories';

export class ImagenesPdtoProductoController {
  constructor(
    @repository(ImagenesPdtoRepository)
    public imagenesPdtoRepository: ImagenesPdtoRepository,
  ) { }

  @get('/imagenes-pdtos/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to ImagenesPdto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof ImagenesPdto.prototype.idImagen,
  ): Promise<Producto> {
    return this.imagenesPdtoRepository.producto(id);
  }
}
