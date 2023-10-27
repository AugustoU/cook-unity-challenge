import { Test, TestingModule } from '@nestjs/testing';
import { MealRatingsService } from './meal-ratings.service';

describe('MealRatingsService', () => {
  let service: MealRatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealRatingsService],
    }).compile();

    service = module.get<MealRatingsService>(MealRatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
