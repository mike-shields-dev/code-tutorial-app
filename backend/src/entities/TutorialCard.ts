import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TutorialCard implements ITutorialCard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  imgSrc?: string | undefined;

  @Column()
  imgAlt?: string | undefined;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
