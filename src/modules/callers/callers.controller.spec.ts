import { Test, TestingModule } from '@nestjs/testing';
import { CallersController } from './callers.controller';
import { CallersService } from './callers.service';

describe('CallersController', () => {
  let controller: CallersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallersController],
      providers: [CallersService],
    }).compile();

    controller = module.get<CallersController>(CallersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
