import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id!: number; // The primary key, auto-incremented

    @Column("text")
    title!: string; // Column for lesson title

    @Column()
    isActive!: boolean; // Column to indicate if the lesson is active

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date; // Column to store creation date with default value
}
