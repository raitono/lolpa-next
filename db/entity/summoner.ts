import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Summoner extends BaseEntity {
  @PrimaryGeneratedColumn()
  public internalId?: number;
  @Column()
  public puuid: string;
  @Column()
  public accountId: string;
  @Column()
  public profileIconId: number;
  @Column("bigint")
  public revisionDate: number;
  @Column()
  public name: string;
  @Column()
  public id: string;
  @Column()
  public summonerLevel: number;

  constructor(
    accountId: string,
    profileIconId: number,
    revisionDate: number,
    name: string,
    id: string,
    puuid: string,
    summonerLevel: number,
    internalId?: number
  ) {
    super();
    this.internalId = internalId;
    this.accountId = accountId;
    this.profileIconId = profileIconId;
    this.revisionDate = revisionDate;
    this.name = name;
    this.id = id;
    this.puuid = puuid;
    this.summonerLevel = summonerLevel;
  }
}