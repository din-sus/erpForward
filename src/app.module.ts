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
import { Teacher } from './teachers/entities/teacher.entity';
import { BranchesModule } from './branches/branches.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0490',
    database: 'erp_forward_demo',
    entities: [User],
    synchronize: true,
    autoLoadEntities: true
  }),
    UsersModule, TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Teacher]), PlacementTestModule, GroupsModule, StudentsModule, LidModule, TeachersModule,ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // URL для доступа к файлам
    }), BranchesModule],
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
        // { path: '/users/:id', method: RequestMethod.GET },
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
        { path: '/students/dept', method: RequestMethod.GET },
        { path: '/students/:id', method: RequestMethod.GET },
        { path: '/students/create', method: RequestMethod.POST },
        { path: '/students/update/:id', method: RequestMethod.PATCH },
        { path: '/students/delete/:id', method: RequestMethod.DELETE },

        // lid
        { path: '/lid', method: RequestMethod.GET },
        { path: '/lid/:id', method: RequestMethod.GET },
        { path: '/lid/column/get', method: RequestMethod.GET },
        { path: '/lid/column', method: RequestMethod.POST },
        { path: '/lid/create', method: RequestMethod.POST },
        { path: '/lid/update/:id', method: RequestMethod.PATCH },
        { path: '/lid/delete/:id', method: RequestMethod.DELETE },

        // teachers
        { path: '/teachers/create', method: RequestMethod.POST },
        { path: '/teachers/update/:id', method: RequestMethod.PATCH },
        { path: '/teachers/delete/:id', method: RequestMethod.DELETE },
        { path: '/teachers/all', method: RequestMethod.GET },

        // branches
        { path: '/branches', method: RequestMethod.GET },
        { path: '/branches/:id', method: RequestMethod.GET },
        { path: '/branches/create', method: RequestMethod.POST },
        { path: '/branches/udpate/:id', method: RequestMethod.PATCH },
        { path: '/branches/delete/:id', method: RequestMethod.DELETE },
      )

      .apply(MainTeacherToken)
      .forRoutes(
        // teachers
        { path: '/teachers', method: RequestMethod.GET },
        { path: '/teachers/me/update/:id', method: RequestMethod.PATCH },
      )
  }
}
