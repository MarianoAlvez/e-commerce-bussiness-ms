import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ProductInvoice, ProductInvoiceRelations} from '../models';

export class ProductInvoiceRepository extends DefaultCrudRepository<
  ProductInvoice,
  typeof ProductInvoice.prototype.id,
  ProductInvoiceRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ProductInvoice, dataSource);
  }
}
