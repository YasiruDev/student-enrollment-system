import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule } from './app.module';

describe('App serivice', () => {
  let appService: AppService;


  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({

      providers: [AppService],
   
    }).compile();

    appService = app.get<AppService>(AppService);
   
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe('Hello World!');
    });

  });
});
