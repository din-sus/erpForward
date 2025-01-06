import { Student } from "src/students/entities/student.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    login: string

    @Column()
    password: string

    @Column()
    fullname: string

    @Column()
    photo: string
    
    @Column()
    birthDate: string

    @Column({unique: true})
    phoneNumber: string

    @Column({default: 'user'})
    role: string

    @OneToMany(() => Student, (student) => student.user, {onDelete: 'CASCADE'})
    student: [Student]
}