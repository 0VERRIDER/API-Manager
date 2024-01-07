import { Test, TestingModule } from '@nestjs/testing';
import { CallersService } from './callers.service';

describe('CallersService', () => {
  let service: CallersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallersService],
    }).compile();

    service = module.get<CallersService>(CallersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
