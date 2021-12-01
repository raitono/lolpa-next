import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Participant } from "./participant";
import { Team } from "./team";

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  // MetadataDto
  @Column()
  public dataVersion!: string;
  @Column()
  public matchId!: string;
  // public participants: string[]; // Not needed

  // InfoDto
  @Column()
  public gameCreation!: number;
  @Column()
  public gameDuration!: number;
  //public gameEndTimestamp: number; // No longer provided as part of the Twisted package
  @Column()
  public gameId!: number;
  @Column()
  public gameMode!: string;
  @Column()
  public gameName!: string;
  @Column()
  public gameStartTimestamp!: number;
  @Column()
  public gameType!: string;
  @Column()
  public gameVersion!: string;
  @Column()
  public mapId!: number;
  @OneToMany("Participant", "match")
  public participants!: Promise<Participant[]>;
  @Column()
  public platformId!: string;
  @Column()
  public queueId!: number;
  @OneToMany("Team", "match")
  public teams!: Promise<Team[]>;
  @Column()
  public tournamentCode!: string;
}
