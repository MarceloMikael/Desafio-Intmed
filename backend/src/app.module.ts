import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MedicoModule } from './medico/medico.module';
import { AgendaModule } from './agenda/agenda.module';
import { ConsultaModule } from './consulta/consulta.module';
import { Usuario } from './entities/usuario.entity';
import { Especialidade } from './entities/especialidade.entity';
import { Medico } from './entities/medico.entity';
import { Agenda } from './entities/agenda.entity';
import { Consulta } from './entities/consulta.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_NAME || 'postgres',
      entities: [Usuario, Especialidade, Medico, Agenda, Consulta],
      synchronize: true,
      logging: process.env.NODE_ENV === 'development',
      retryAttempts: 5,
      retryDelay: 3000,
      autoLoadEntities: true,
    }),
    AuthModule,
    MedicoModule,
    AgendaModule,
    ConsultaModule,
  ],
})
export class AppModule {}

