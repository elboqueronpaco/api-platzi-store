import { Injectable } from '@nestjs/common';
import { customers } from '../data/customers.data';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers = customers;
  async findAll() {
    return this.customers;
  }
}
