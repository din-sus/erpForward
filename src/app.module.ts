import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VerifyToken } from './middleware/VerifyToken';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0490',
    database: 'erp_forward',
    entities: [User],
    synchronize: true,
    autoLoadEntities: true
  }),
    UsersModule, TypeOrmModule.forFeature([User])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyToken)
      .forRoutes(
        { path: '/users/all', method: RequestMethod.GET},
        { path: '/users/create', method: RequestMethod.POST },
        { path: '/users/:id', method: RequestMethod.GET },
        { path: '/users/update/:id', method: RequestMethod.PATCH },
        { path: '/users/delete/:id', method: RequestMethod.DELETE }
      )
  }
}
