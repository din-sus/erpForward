import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VerifyToken } from './middleware/VerifyToken';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity';
import { PlacementTestModule } from './placement_test/placement_test.module';
import { GroupsModule } from './groups/groups.module';
import { StudentsModule } from './students/students.module';
import { LidModule } from './lid/lid.module';
import { MainTeacherToken } from './middleware/MainTeacherToken';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0490',
    database: 'ss',
    entities: [User],
    synchronize: true,
    autoLoadEntities: true
  }),
    UsersModule, TypeOrmModule.forFeature([User]), PlacementTestModule, GroupsModule, StudentsModule, LidModule, TeachersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyToken)
      .forRoutes(
        // users
        { path: '/users/all', method: RequestMethod.GET},
        { path: '/users/create', method: RequestMethod.POST },
        { path: '/users/:id', method: RequestMethod.GET },
        { path: '/users/update/:id', method: RequestMethod.PATCH },
        { path: '/users/delete/:id', method: RequestMethod.DELETE },

        // placement-test
        { path: '/placement-test', method: RequestMethod.GET },
        { path: '/placement-test/:id', method: RequestMethod.GET },
        { path: '/placement-test/update/:id', method: RequestMethod.PATCH },
        { path: '/placement-test/delete/:id', method: RequestMethod.DELETE },

        // groups
        { path: '/groups', method: RequestMethod.GET },
        { path: '/groups/filter', method: RequestMethod.GET },
        { path: '/groups/create', method: RequestMethod.POST },
        { path: '/groups/update/:id', method: RequestMethod.PATCH },
        { path: '/groups/delete/:id', method: RequestMethod.DELETE },

        // students
        { path: '/students', method: RequestMethod.GET },
        { path: '/students/:id', method: RequestMethod.GET },
        { path: '/students/create', method: RequestMethod.POST },
        { path: '/students/update/:id', method: RequestMethod.PATCH },
        { path: '/students/delete/:id', method: RequestMethod.DELETE },

        // lid
        { path: '/lid', method: RequestMethod.GET },
        { path: '/lid/:id', method: RequestMethod.GET },
        { path: '/lid/create', method: RequestMethod.POST },
        { path: '/lid/update/:id', method: RequestMethod.PATCH },
        { path: '/lid/delete/:id', method: RequestMethod.DELETE },
      )
  }
}
