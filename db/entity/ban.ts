import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team";

@Entity()
export class Ban {
  @ManyToOne("Team", "teamBans")
  public team!: Team;

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public championId!: number;
  @Column()
  public pickTurn!: number;
}