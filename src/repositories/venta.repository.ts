import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Venta, VentaRelations, DetalleVenta, Cliente, Vendedor} from '../models';
import {DetalleVentaRepository} from './detalle-venta.repository';
import {ClienteRepository} from './cliente.repository';
import {VendedorRepository} from './vendedor.repository';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype.idVenta,
  VentaRelations
> {

  public readonly detalleVentas: HasManyRepositoryFactory<DetalleVenta, typeof Venta.prototype.idVenta>;

  public readonly cliente: HasOneRepositoryFactory<Cliente, typeof Venta.prototype.idVenta>;

  public readonly vendedor: HasOneRepositoryFactory<Vendedor, typeof Venta.prototype.idVenta>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DetalleVentaRepository') protected detalleVentaRepositoryGetter: Getter<DetalleVentaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VendedorRepository') protected vendedorRepositoryGetter: Getter<VendedorRepository>,
  ) {
    super(Venta, dataSource);
    this.vendedor = this.createHasOneRepositoryFactoryFor('vendedor', vendedorRepositoryGetter);
    this.registerInclusionResolver('vendedor', this.vendedor.inclusionResolver);
    this.cliente = this.createHasOneRepositoryFactoryFor('cliente', clienteRepositoryGetter);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.detalleVentas = this.createHasManyRepositoryFactoryFor('detalleVentas', detalleVentaRepositoryGetter,);
    this.registerInclusionResolver('detalleVentas', this.detalleVentas.inclusionResolver);
  }
}
