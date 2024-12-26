import { Group } from "src/groups/entities/group.entity";
import { Lid } from "src/lid/entities/lid.entity";
import { User } from "src/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    phoneNumber: string

    @Column({default: '0'})
    balance: string

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

    @OneToMany(() => User, (user) => user.student, {onDelete: 'CASCADE'})
    user: Group

    @OneToOne(() => Lid)
    @JoinColumn()
    lid: Lid
}
