import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Lesson } from "./Lesson";
import { Topic } from "./Topic";
import { IsIn, Length, validateOrReject, IsBoolean, IsDefined, ArrayNotEmpty } from "class-validator";
import { sanitize, Trim } from "class-sanitizer";

@Entity()
export class Tutorial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsDefined()
  @Length(1)
  @Trim()
  title!: string;

  @Column()
  @IsDefined()
  @Length(1)
  @Trim()
  description!: string;

  @Column()
  @IsDefined()
  @IsIn(["beginner", "intermediate", "advanced"])
  @Trim()
  level!: string;

  @Column()
  @IsDefined()
  @IsBoolean()
  is_published!: boolean;

  @ManyToMany(() => Topic, (topic) => topic.tutorials)
  @JoinTable()  // Creates a join table to handle the many-to-many relationship
  @IsDefined()
  @ArrayNotEmpty({ message: "At least one topic is required" })
  topics!: Topic[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.tutorial)
  @IsDefined()
  lessons!: Lesson[];

  @BeforeInsert()
  @BeforeUpdate()
  async validateAndSanitize() {
    sanitize(this);
    await validateOrReject(this);
  }
}
