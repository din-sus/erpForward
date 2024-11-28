import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlacementTest {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    phoneNumber: string

    @Column({default: 0})
    module1: number

    @Column({default: 0})
    module2: number
    
    @Column({default: 0})
    module3: number

    @Column({nullable: true})
    writing: string

    @Column({default: 0})
    total: number

    @Column({
        type: 'enum',
        enum: ['Beginner', 'Elementary', 'Pre-intermediate', 'Intermediate', 'Upper-intermediate', 'Advanced'],
        default: 'Beginner'
    })
    level: string

    @Column({nullable: true})
    writingMark: number
}
