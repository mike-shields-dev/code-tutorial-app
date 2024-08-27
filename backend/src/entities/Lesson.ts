import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tutorial } from "./Tutorial";

@Entity()
export class Lesson implements ILesson {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  title!: string;

  @Column()
  is_published!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @ManyToOne(() => Tutorial, (tutorial) => tutorial.lessons)
  tutorial!: Tutorial;
}
