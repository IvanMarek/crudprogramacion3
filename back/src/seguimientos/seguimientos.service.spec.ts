import { Test, TestingModule } from '@nestjs/testing';
import { SeguimientosService } from './seguimientos.service';

describe('SeguimientosService', () => {
  let service: SeguimientosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguimientosService],
    }).compile();

    service = module.get<SeguimientosService>(SeguimientosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
