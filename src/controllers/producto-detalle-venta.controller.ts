import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  DetalleVenta,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoDetalleVentaController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/detalle-venta', {
    responses: {
      '200': {
        description: 'DetalleVenta belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleVenta)},
          },
        },
      },
    },
  })
  async getDetalleVenta(
    @param.path.string('id') id: typeof Producto.prototype.idProducto,
  ): Promise<DetalleVenta> {
    return this.productoRepository.detalleVenta(id);
  }
}
