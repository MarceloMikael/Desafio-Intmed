import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Medico } from './medico.entity';

@Entity('consulta')
export class Consulta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  dia: string;

  @Column({ type: 'time' })
  horario: string;

  @Column({ 
    name: 'data_agendamento',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP'
  })
  dataAgendamento: Date;

  @Column({ name: 'medico_id' })
  medicoId: number;

  @ManyToOne(() => Medico, (medico) => medico.consultas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medico_id' })
  medico: Medico;
}

