import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
