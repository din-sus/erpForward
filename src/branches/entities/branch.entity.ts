import { Group } from "src/groups/entities/group.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Branch {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: false})
    name: string

    @Column()
    roomName: string

    @Column()
    locationName: string

    @Column()
    locationLink: string

    @Column()
    locationImg: string

    @Column({nullable: true})
    branchCapacity: string

    @Column({nullable: true})
    roomCapacity: string

    @OneToMany(() => Group, (group) => group.branches, {onDelete: 'CASCADE'})
    group: Group[]
}
