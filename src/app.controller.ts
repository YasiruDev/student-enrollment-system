import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { AppService } from './app.service';

class QueueDTO {
  @IsNotEmpty()
  item: number;

  @IsNotEmpty()
  priority: number;
}
@Controller('/queue')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  insertPriority(@Body() queueDto: QueueDTO) {
    const { item, priority } = queueDto;
    return this.appService.insert(item, priority);
  }
  @Get('/pop')
  popQueue() {
    return this.appService.pop();
  }
  @Get('/peek')
  peekQueue() {
    return this.appService.peek();
  }

  @Get('/isEmpty')
  checkIsEmpty() {
    return this.appService.isEmpty();
  }
}
