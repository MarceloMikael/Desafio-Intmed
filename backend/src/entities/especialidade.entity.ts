import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Medico } from './medico.entity';

@Entity('especialidade')
export class Especialidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nome: string;

  @OneToMany(() => Medico, (medico) => medico.especialidade)
  medicos: Medico[];
}

