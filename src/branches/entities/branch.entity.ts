import { Group } from "src/groups/entities/group.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Branch {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    roomName: string

    @Column()
    locationName: string

    @Column()
    locationLink: string

    @Column()
    locationImg: string

    @Column()
    branchCapacity: number

    @Column()
    roomCapacity: number

    @OneToOne(() => Group)
    @JoinColumn()
    group: Group
}
