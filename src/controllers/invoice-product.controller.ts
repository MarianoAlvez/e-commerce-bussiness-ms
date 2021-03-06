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
Invoice,
ProductInvoice,
Product,
} from '../models';
import {InvoiceRepository} from '../repositories';

export class InvoiceProductController {
  constructor(
    @repository(InvoiceRepository) protected invoiceRepository: InvoiceRepository,
  ) { }

  @get('/invoices/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Invoice has many Product through ProductInvoice',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.invoiceRepository.products(id).find(filter);
  }

  @post('/invoices/{id}/products', {
    responses: {
      '200': {
        description: 'create a Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Invoice.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInInvoice',
            exclude: ['id'],
          }),
        },
      },
    }) product: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.invoiceRepository.products(id).create(product);
  }

  @patch('/invoices/{id}/products', {
    responses: {
      '200': {
        description: 'Invoice.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.invoiceRepository.products(id).patch(product, where);
  }

  @del('/invoices/{id}/products', {
    responses: {
      '200': {
        description: 'Invoice.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.invoiceRepository.products(id).delete(where);
  }
}
