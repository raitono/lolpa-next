import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Match } from "./match";
import { PerkStyleSelection } from "./perkStyleSelection";

@Entity()
export class Participant extends BaseEntity {
  @ManyToOne("Match", "participants")
  public match!: Match;

  @PrimaryGeneratedColumn()
  public id?: number;
  @Column()
  public assists!: number;
  @Column()
  public baronKills!: number;
  @Column()
  public bountyLevel!: number;
  @Column()
  public champExperience!: number;
  @Column()
  public champLevel!: number;
  @Column()
  public championId!: number;
  @Column()
  public championName!: string;
  @Column()
  public championTransform!: number;
  @Column()
  public consumablesPurchased!: number;
  @Column()
  public damageDealtToBuildings!: number;
  @Column()
  public damageDealtToObjectives!: number;
  @Column()
  public damageDealtToTurrets!: number;
  @Column()
  public damageSelfMitigated!: number;
  @Column()
  public deaths!: number;
  @Column()
  public detectorWardsPlaced!: number;
  @Column()
  public doubleKills!: number;
  @Column()
  public dragonKills!: number;
  @Column()
  public firstBloodAssist!: boolean;
  @Column()
  public firstBloodKill!: boolean;
  @Column()
  public firstTowerAssist!: boolean;
  @Column()
  public firstTowerKill!: boolean;
  @Column()
  public gameEndedInEarlySurrender!: boolean;
  @Column()
  public gameEndedInSurrender!: boolean;
  @Column()
  public goldEarned!: number;
  @Column()
  public goldSpent!: number;
  @Column()
  public individualPosition!: string;
  @Column()
  public inhibitorKills!: number;
  @Column()
  public inhibitorTakedowns!: number;
  @Column()
  public inhibitorsLost!: number;
  @Column()
  public item0!: number;
  @Column()
  public item1!: number;
  @Column()
  public item2!: number;
  @Column()
  public item3!: number;
  @Column()
  public item4!: number;
  @Column()
  public item5!: number;
  @Column()
  public item6!: number;
  @Column()
  public itemsPurchased!: number;
  @Column()
  public killingSprees!: number;
  @Column()
  public kills!: number;
  @Column()
  public lane!: string;
  @Column()
  public largestCriticalStrike!: number;
  @Column()
  public largestMultiKill!: number;
  @Column()
  public longestTimeSpentLiving!: number;
  @Column()
  public magicDamageDealt!: number;
  @Column()
  public magicDamageDealtToChampions!: number;
  @Column()
  public magicDamageTaken!: number;
  @Column()
  public neutralMinionsKilled!: number;
  @Column()
  public nexusKills!: number;
  @Column()
  public nexusTakedowns!: number;
  @Column()
  public nexusLost!: number;
  @Column()
  public objectivesStolen!: number;
  @Column()
  public objectivesStolenAssists!: number;
  @Column()
  public participantId!: number;
  @Column()
  public pentaKills!: number;
  @Column()
  public defensePerk!: number;
  @Column()
  public flexPerk!: number;
  @Column()
  public offensePerk!: number;
  @Column()
  public perkStyleDescription!: string;
  @Column()
  public perkStyle!: number;
  @ManyToOne(type => PerkStyleSelection)
  public perkStyleSelections!: Promise<PerkStyleSelection[]>;
  @Column()
  public physicalDamageDealt!: number;
  @Column()
  public physicalDamageDealtToChampions!: number;
  @Column()
  public physicalDamageTaken!: number;
  @Column()
  public profileIcon!: number;
  @Column()
  public puuid!: string;
  @Column()
  public quadraKills!: number;
  @Column()
  public riotIdName!: string;
  @Column()
  public riotIdTagline!: string;
  @Column()
  public role!: string;
  @Column()
  public sightWardsBoughtInGame!: number;
  @Column()
  public spell1Casts!: number;
  @Column()
  public spell2Casts!: number;
  @Column()
  public spell3Casts!: number;
  @Column()
  public spell4Casts!: number;
  @Column()
  public summoner1Casts!: number;
  @Column()
  public summoner1Id!: number;
  @Column()
  public summoner2Casts!: number;
  @Column()
  public summoner2Id!: number;
  @Column()
  public summonerId!: string;
  @Column()
  public summonerName!: string;
  @Column()
  public teamEarlySurrendered!: boolean;
  @Column()
  public teamId!: number;
  @Column()
  public teamPosition!: string;
  @Column()
  public timeCCingOthers!: string;
  @Column()
  public timePlayed!: number;
  @Column()
  public totalDamageDealt!: number;
  @Column()
  public totalDamageDealtToChampions!: number;
  @Column()
  public totalDamageShieldedOnTeammates!: number;
  @Column()
  public totalDamageTaken!: number;
  @Column()
  public totalHeal!: number;
  @Column()
  public totalHealsOnTeammates!: number;
  @Column()
  public totalMinionsKilled!: number;
  @Column()
  public totalTimeCCDealt!: number;
  @Column()
  public totalTimeSpentDead!: number;
  @Column()
  public totalUnitsHealed!: number;
  @Column()
  public tripleKills!: number;
  @Column()
  public trueDamageDealt!: number;
  @Column()
  public trueDamageDealtToChampions!: number;
  @Column()
  public turretKills!: number;
  @Column()
  public turretTakedowns!: number;
  @Column()
  public turretsLost!: number;
  @Column()
  public unrealKills!: number;
  @Column()
  public visionScore!: number;
  @Column()
  public visionWardsBoughtInGame!: number;
  @Column()
  public wardsKilled!: number;
  @Column()
  public wardsPlaced!: number;
  @Column()
  public win!: boolean;
}