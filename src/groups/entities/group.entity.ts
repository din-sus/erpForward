import { Student } from "src/students/entities/student.entity";
import { Teacher } from "src/teachers/entities/teacher.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({nullable: true})
    groupType: string

    @Column()
    daysOfLessons: string

    @Column()
    startingEndingTime: string

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

    @ManyToOne(() => Teacher, (teacher) => teacher.group, {onDelete: 'CASCADE'})
    teacher: Teacher
}