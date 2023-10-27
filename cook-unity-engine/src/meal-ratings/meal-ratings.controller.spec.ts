import { Test, TestingModule } from '@nestjs/testing';
import { MealRatingsController } from './meal-ratings.controller';

describe('MealRatingsController', () => {
  let controller: MealRatingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealRatingsController],
    }).compile();

    controller = module.get<MealRatingsController>(MealRatingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
