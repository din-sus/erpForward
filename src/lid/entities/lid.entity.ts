import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LidColumnEntity } from "./column.lid.dto";

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
}
