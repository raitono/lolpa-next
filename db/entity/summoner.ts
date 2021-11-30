import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Summoner extends BaseEntity {
  @PrimaryGeneratedColumn()
  public internalId?: number;
  @Column()
  public puuid!: string;
  @Column()
  public accountId!: string;
  @Column()
  public profileIconId!: number;
  @Column("bigint")
  public revisionDate!: number;
  @Column()
  public name!: string;
  @Column()
  public id!: string;
  @Column()
  public summonerLevel!: number;
}