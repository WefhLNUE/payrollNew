import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HrRecruitmentModule } from '../hr-recruitment/hr-recruitment.module';
import { LeavesModule } from '../leaves-subsystem/leaves/leaves.module';
import { Employee, EmployeeSchema } from '../employee-profile-new/employee-profile/models/employee.schema';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    // Register Employee schema to resolve references
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    HrRecruitmentModule,
    LeavesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}