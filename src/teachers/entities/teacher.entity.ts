import { Group } from "src/groups/entities/group.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    fullname: string

    @Column({nullable: true})
    age: string

    @Column({unique: true})
    phoneNumber: string

    @Column({unique: true})
    login: string

    @Column()
    password: string

    @Column({default: 'mainTeacher'})
    role: string

    @Column()
    IELTSscore: string

    @Column({nullable: true})
    IELTSscoreImg: string

    @Column({nullable: true})
    teacherImg: string

    @Column()
    workingBranch: string

    @Column()
    countryAddress: string

    @OneToMany(() => Group, (group) => group.teacher, {onDelete: 'CASCADE'})
    group: Group[]
}
