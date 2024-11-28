import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    level: string

    @Column()
    teacherName: string

    @Column()
    daysOfLessons: string

    @Column()
    branch: string

    @Column({
        type: 'enum',
        enum: ['Deactive', 'Active']
    })
    status: string
}