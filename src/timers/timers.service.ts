import { Injectable } from '@nestjs/common';
import { CreateTimerDto } from './dto/create-timer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TimersService {
  constructor(private prisma: PrismaService) {}
  create(createTimerDto: CreateTimerDto) {
    return this.prisma.timer.create({
      data: createTimerDto,
    })
  }

  findAll() {
    //return `This action returns all timers of today`;
    let today = new Date();
    today.setHours(0,0,0,0) // formatting date
    today.setHours(today.getHours()+1,0,0,0) // formatting date
    return this.prisma.timer.findMany({ where: { createdAt: {
      gte: today,
    } },orderBy:{createdAt:'desc'} });
  }

}