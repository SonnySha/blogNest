/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { BlogControllerController } from './blog-controller.controller';



describe('BlogControllerController', () => {
  let controller: BlogControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogControllerController],
    }).compile();

    controller = module.get<BlogControllerController>(BlogControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
