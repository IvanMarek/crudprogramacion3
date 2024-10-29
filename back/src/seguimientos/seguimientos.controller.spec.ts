import { Test, TestingModule } from '@nestjs/testing';
import { SeguimientosController } from './seguimientos.controller';
import { SeguimientosService } from './seguimientos.service';

describe('SeguimientosController', () => {
  let controller: SeguimientosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeguimientosController],
      providers: [SeguimientosService],
    }).compile();

    controller = module.get<SeguimientosController>(SeguimientosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
