import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimersService } from './timers.service';
import { CreateTimerDto } from './dto/create-timer.dto';
import { UpdateTimerDto } from './dto/update-timer.dto';

@Controller('timers')
export class TimersController {
  constructor(private readonly timersService: TimersService) {}

  @Post()
  create(@Body() createTimerDto: CreateTimerDto) {
    return this.timersService.create(createTimerDto);
  }

  @Get()
  findAll() {
    return this.timersService.findAll();
  }

}
