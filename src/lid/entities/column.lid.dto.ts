import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Lid } from './lid.entity';

@Entity()
export class LidColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  title: string;

  @Column()
  color: string;

  @Column()
  status: string

  @OneToMany(() => Lid, (lid) => lid.column, { cascade: true })
  items: Lid[];
}
