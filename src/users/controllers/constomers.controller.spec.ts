import { Test, TestingModule } from '@nestjs/testing';
import { ConstomersController } from './customers.controller';

describe('ConstomersController', () => {
  let controller: ConstomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstomersController],
    }).compile();

    controller = module.get<ConstomersController>(ConstomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
