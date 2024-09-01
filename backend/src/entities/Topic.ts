import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Tutorial } from "./Tutorial";

@Entity()
export class Topic implements ITopic {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @ManyToMany(() => Tutorial, (tutorial) => tutorial.topics)
  tutorials!: Tutorial[];  // Reverse relation in the `Tutorial` entity
}
