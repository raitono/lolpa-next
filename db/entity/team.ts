import { Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { Match } from "./match";
import { Ban } from "./ban";
import { Objective } from "./objective";

@Entity()
export class Team {
  @ManyToOne("Match", "teams")
  public match!: Match;

  @PrimaryGeneratedColumn()
  public id?: number;

  @OneToMany("Ban", "team")
  public teamBans!: Promise<Ban[]>;

  @OneToMany("Objective", "team")
  public objectives!: Promise<Objective[]>;

  @Column()
  public teamId!: number;
  @Column()
  public win!: boolean;
}