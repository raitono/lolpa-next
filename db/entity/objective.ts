import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team";

@Entity()
export class Objective {
  @ManyToOne("Team", "objectives")
  public team!: Team;

  @PrimaryGeneratedColumn()
  public id?: number;

  // Custom column to hold the objective type. i.e. "baron", "tower", etc
  @Column()
  public type!: string;
  @Column()
  public first!: boolean;
  @Column()
  public kills!: number;
}