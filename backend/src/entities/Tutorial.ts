import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tutorial implements ITutorial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  is_active!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
