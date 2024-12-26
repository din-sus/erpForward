import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LidColumnEntity } from "./column.lid.dto";
import { Student } from "src/students/entities/student.entity";

@Entity()
export class Lid {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column({unique: true})
    phoneNumber: string

    @Column()
    branch: string

    @Column({nullable: true})
    status: string

    @ManyToOne(() => LidColumnEntity, (column) => column.items)
    column: LidColumnEntity

    @OneToOne(() => Student)
    @JoinColumn()
    student: Student
}
