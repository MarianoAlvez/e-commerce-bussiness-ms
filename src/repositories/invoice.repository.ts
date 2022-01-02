import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Invoice, InvoiceRelations, Product, ProductInvoice, Customer} from '../models';
import {ProductInvoiceRepository} from './product-invoice.repository';
import {ProductRepository} from './product.repository';
import {CustomerRepository} from './customer.repository';

export class InvoiceRepository extends DefaultCrudRepository<
  Invoice,
  typeof Invoice.prototype.id,
  InvoiceRelations
> {

  public readonly products: HasManyThroughRepositoryFactory<Product, typeof Product.prototype.id,
          ProductInvoice,
          typeof Invoice.prototype.id
        >;

  public readonly customer: BelongsToAccessor<Customer, typeof Invoice.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProductInvoiceRepository') protected productInvoiceRepositoryGetter: Getter<ProductInvoiceRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(Invoice, dataSource);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
    this.products = this.createHasManyThroughRepositoryFactoryFor('products', productRepositoryGetter, productInvoiceRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
