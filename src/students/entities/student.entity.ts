import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    phoneNumber: string

    @Column({default: 0})
    balance: number

    @Column()
    level: string

    @Column()
    branch: string

    @Column()
    birthDate: string

    @Column()
    gender: string

    @Column()
    courseStartingDate: string

    @Column()
    courseEndingDate: string

    @ManyToOne(() => Group, (group) => group.student, {onDelete: 'CASCADE'})
    group: Group

    @ManyToOne(() => User, (user) => user.student, {onDelete: 'CASCADE'})
    user: User
}
