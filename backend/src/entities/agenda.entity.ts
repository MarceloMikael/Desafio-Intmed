import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Medico } from './medico.entity';

@Entity('agenda')
export class Agenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'medico_id' })
  medicoId: number;

  @Column({ type: 'date' })
  dia: string;

  @Column({ type: 'text', array: true })
  horarios: string[];

  @ManyToOne(() => Medico, (medico) => medico.agendas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medico_id' })
  medico: Medico;
}

