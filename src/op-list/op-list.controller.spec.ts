import { Test, TestingModule } from '@nestjs/testing';
import { OpListController } from './op-list.controller';

describe('OpListController', () => {
  let controller: OpListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpListController],
    }).compile();

    controller = module.get<OpListController>(OpListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
