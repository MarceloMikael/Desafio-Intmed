import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Especialidade } from './especialidade.entity';
import { Agenda } from './agenda.entity';
import { Consulta } from './consulta.entity';

@Entity('medico')
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  crm: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'especialidade_id' })
  especialidadeId: number;

  @ManyToOne(() => Especialidade, (especialidade) => especialidade.medicos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'especialidade_id' })
  especialidade: Especialidade;

  @OneToMany(() => Agenda, (agenda) => agenda.medico)
  agendas: Agenda[];

  @OneToMany(() => Consulta, (consulta) => consulta.medico)
  consultas: Consulta[];
}

