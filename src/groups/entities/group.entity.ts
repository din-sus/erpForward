import { Student } from "src/students/entities/student.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    courseStartingDate: string

    @Column()
    courseEndingDate: string

    @OneToMany(() => Student, (student) => student.group, {onDelete: 'CASCADE'})
    student: Student[]
}