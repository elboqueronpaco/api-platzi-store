import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CustomersService } from '../services/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getCustomers() {
    return await this.customersService.findAll();
  }
}
