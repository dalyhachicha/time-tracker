import { Module } from '@nestjs/common';
import { TimersService } from './timers.service';
import { TimersController } from './timers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TimersController],
  providers: [TimersService],
  imports: [PrismaModule]
})
export class TimersModule {}
