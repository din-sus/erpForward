import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @Column()
    level: string

    @Column()
    teacherName: string

    @Column()
    daysOfLessons: string

    @Column()
    branch: string

    @Column({default: 'Active'})
    status: string
}