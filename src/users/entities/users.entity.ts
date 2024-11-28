import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    login: string

    @Column()
    password: string

    @Column()
    name: string

    @Column()
    surname: string

    @Column({default: 'somehting'})
    photo: string
    
    @Column()
    birthDate: string

    @Column({unique: true})
    phoneNumber: string

    @Column({default: 'user'})
    role: string
}