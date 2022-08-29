import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { ServeStaticModule} from '@nestjs/serve-static'; 
import { join } from 'path';
import { TimersModule } from './timers/timers.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'timetracker-frontend/dist'), 
    }),
    TimersModule//,
    ///PrismaModule, TimerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
