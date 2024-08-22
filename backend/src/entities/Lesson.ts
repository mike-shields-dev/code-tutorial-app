import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Lesson implements ILesson {
  @PrimaryGeneratedColumn()
  id!: number; // The primary key, auto-incremented

  @Column("text")
  title!: string; // Column for lesson title

  @Column()
  is_published!: boolean; // Column to indicate if the lesson is active

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date; // Column to store creation date with default value
}
