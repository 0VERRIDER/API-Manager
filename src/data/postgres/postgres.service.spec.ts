import { Test, TestingModule } from '@nestjs/testing';
import { PostgresService } from './postgres.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('PostgresService', () => {
  let service: PostgresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostgresService,
        {
          provide: getRepositoryToken(User),
          useValue: {}, // Add your mock methods here
        },
        {
          provide: 'DataSource',
          useValue: {}, // Add your mock methods here
        },
      ],
      imports: [
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    service = module.get<PostgresService>(PostgresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});