import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { customers } from '../data/customers.data';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers = customers;
  async getIndex(id: number) {
    return this.customers.findIndex((item) => item.id === id);
  }
  async findAll() {
    return this.customers;
  }
  async findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer)
      throw new HttpException(
        `Customer #${id} NOT FOUND`,
        HttpStatus.BAD_REQUEST,
      );
    return customer;
  }
  async create(creatreCustomerDto: CreateCustomerDto) {
    this.counterId = this.counterId + 1;
    const customer = {
      id: this.counterId,
      ...creatreCustomerDto,
    };
    this.customers.push(customer);
    return customer;
  }
  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    const index = await this.getIndex(id);
    this.customers[index] = {
      ...customer,
      ...updateCustomerDto,
    };
    return this.customers[index];
  }
  async remove(id: number) {
    const index = await this.getIndex(id);
    if (index === -1) throw new NotFoundException(`Customer #${id} NOT FOUND`);
    this.customers.splice(index, 1);
    return true;
  }
}
