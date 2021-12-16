import { AutoMap } from "@automapper/classes";

export class MatchDto {
  metadata!: MetadataDto;
  info!: InfoDto;
}
export class MetadataDto {
  /** Match data version. */
  @AutoMap()
  dataVersion!: string;
  /** Match id. */
  @AutoMap()
  matchId!: string;
  /** A list of participant PUUIDs */
  participants!: string[];
}
export class InfoDto {
  /** Unix timestamp for when the game is created(i.e., the loading screen). */
  @AutoMap()
  gameCreation!: number;
  /** Game length in milliseconds. */
  @AutoMap()
  gameDuration!: number;
  @AutoMap()
  gameId!: number;
  /** Refer to the Game Constants documentation. */
  @AutoMap()
  gameMode!: string;
  @AutoMap()
  gameName!: string;
  /** Unix timestamp for when match actually starts. */
  @AutoMap()
  gameStartTimestamp!: number;
  @AutoMap()
  gameType!: string;
  /** The first two parts can be used to determine the patch a game was played on. */
  @AutoMap()
  gameVersion!: string;
  /** Refer to the Game Constants documentation. */
  @AutoMap()
  mapId!: number;
  @AutoMap()
  participants!: ParticipantDto[];
  /** Platform where the match was played. */
  @AutoMap()
  platformId!: string;
  /** Refer to the Game Constants documentation. */
  @AutoMap()
  queueId!: number;
  @AutoMap()
  teams!: TeamDto[];
  /** Tournament code used to generate the match. */
  @AutoMap()
  tournamentCode!: string;
}
export class ParticipantDto {
  @AutoMap()
  assists!: number;
  @AutoMap()
  baronKills!: number;
  @AutoMap()
  bountyLevel!: number;
  @AutoMap()
  champExperience!: number;
  @AutoMap()
  champLevel!: number;
  @AutoMap()
  championId!: number;
  @AutoMap()
  championName!: string;
  /** This field is currently only utilized for Kayn's transformations. (Legal values: 0 - None, 1 - Slayer, 2 - Assassin) */
  @AutoMap()
  championTransform!: number;
  @AutoMap()
  consumablesPurchased!: number;
  @AutoMap()
  damageDealtToBuildings!: number;
  @AutoMap()
  damageDealtToObjectives!: number;
  @AutoMap()
  damageDealtToTurrets!: number;
  @AutoMap()
  damageSelfMitigated!: number;
  @AutoMap()
  deaths!: number;
  @AutoMap()
  detectorWardsPlaced!: number;
  @AutoMap()
  doubleKills!: number;
  @AutoMap()
  dragonKills!: number;
  @AutoMap()
  firstBloodAssist!: boolean;
  @AutoMap()
  firstBloodKill!: boolean;
  @AutoMap()
  firstTowerAssist!: boolean;
  @AutoMap()
  firstTowerKill!: boolean;
  @AutoMap()
  gameEndedInEarlySurrender!: boolean;
  @AutoMap()
  gameEndedInSurrender!: boolean;
  @AutoMap()
  goldEarned!: number;
  @AutoMap()
  goldSpent!: number;
  /** Both individualPosition and teamPosition are computed by the game server and are different versions of the most likely position played by a player. The individualPosition is the best guess for which position the player actually played in isolation of anything else. The teamPosition is the best guess for which position the player actually played if we add the constraint that each team must have one top player, one jungle, one middle, etc. Generally the recommendation is to use the teamPosition field over the individualPosition field. */
  @AutoMap({ typeFn: () => String })
  individualPosition!: Position;
  @AutoMap()
  inhibitorKills!: number;
  @AutoMap()
  inhibitorTakedowns!: number;
  @AutoMap()
  inhibitorsLost!: number;
  @AutoMap()
  item0!: number;
  @AutoMap()
  item1!: number;
  @AutoMap()
  item2!: number;
  @AutoMap()
  item3!: number;
  @AutoMap()
  item4!: number;
  @AutoMap()
  item5!: number;
  @AutoMap()
  item6!: number;
  @AutoMap()
  itemsPurchased!: number;
  @AutoMap()
  killingSprees!: number;
  @AutoMap()
  kills!: number;
  @AutoMap({ typeFn: () => String })
  lane!: Lane;
  @AutoMap()
  largestCriticalStrike!: number;
  @AutoMap()
  largestKillingSpree!: number;
  @AutoMap()
  largestMultiKill!: number;
  @AutoMap()
  longestTimeSpentLiving!: number;
  @AutoMap()
  magicDamageDealt!: number;
  @AutoMap()
  magicDamageDealtToChampions!: number;
  @AutoMap()
  magicDamageTaken!: number;
  @AutoMap()
  neutralMinionsKilled!: number;
  @AutoMap()
  nexusKills!: number;
  @AutoMap()
  nexusTakedowns!: number;
  @AutoMap()
  nexusLost!: number;
  @AutoMap()
  objectivesStolen!: number;
  @AutoMap()
  objectivesStolenAssists!: number;
  @AutoMap()
  participantId!: number;
  @AutoMap()
  pentaKills!: number;
  perks!: PerksDto;
  @AutoMap()
  physicalDamageDealt!: number;
  @AutoMap()
  physicalDamageDealtToChampions!: number;
  @AutoMap()
  physicalDamageTaken!: number;
  @AutoMap()
  profileIcon!: number;
  @AutoMap()
  puuid!: string;
  @AutoMap()
  quadraKills!: number;
  @AutoMap()
  riotIdName!: string;
  @AutoMap()
  riotIdTagline!: string;
  @AutoMap({ typeFn: () => String })
  role!: Role;
  @AutoMap()
  sightWardsBoughtInGame!: number;
  @AutoMap()
  spell1Casts!: number;
  @AutoMap()
  spell2Casts!: number;
  @AutoMap()
  spell3Casts!: number;
  @AutoMap()
  spell4Casts!: number;
  @AutoMap()
  summoner1Casts!: number;
  @AutoMap()
  summoner1Id!: number;
  @AutoMap()
  summoner2Casts!: number;
  @AutoMap()
  summoner2Id!: number;
  @AutoMap()
  summonerId!: string;
  @AutoMap()
  summonerLevel!: number;
  @AutoMap()
  summonerName!: string;
  @AutoMap()
  teamEarlySurrendered!: boolean;
  @AutoMap()
  teamId!: number;
  /** Both individualPosition and teamPosition are computed by the game server and are different versions of the most likely position played by a player. The individualPosition is the best guess for which position the player actually played in isolation of anything else. The teamPosition is the best guess for which position the player actually played if we add the constraint that each team must have one top player, one jungle, one middle, etc. Generally the recommendation is to use the teamPosition field over the individualPosition field. */
  @AutoMap({ typeFn: () => String })
  teamPosition!: Position;
  @AutoMap()
  timeCCingOthers!: number;
  @AutoMap()
  timePlayed!: number;
  @AutoMap()
  totalDamageDealt!: number;
  @AutoMap()
  totalDamageDealtToChampions!: number;
  @AutoMap()
  totalDamageShieldedOnTeammates!: number;
  @AutoMap()
  totalDamageTaken!: number;
  @AutoMap()
  totalHeal!: number;
  @AutoMap()
  totalHealsOnTeammates!: number;
  @AutoMap()
  totalMinionsKilled!: number;
  @AutoMap()
  totalTimeCCDealt!: number;
  @AutoMap()
  totalTimeSpentDead!: number;
  @AutoMap()
  totalUnitsHealed!: number;
  @AutoMap()
  tripleKills!: number;
  @AutoMap()
  trueDamageDealt!: number;
  @AutoMap()
  trueDamageDealtToChampions!: number;
  @AutoMap()
  trueDamageTaken!: number;
  @AutoMap()
  turretKills!: number;
  @AutoMap()
  turretTakedowns!: number;
  @AutoMap()
  turretsLost!: number;
  @AutoMap()
  unrealKills!: number;
  @AutoMap()
  visionScore!: number;
  @AutoMap()
  visionWardsBoughtInGame!: number;
  @AutoMap()
  wardsKilled!: number;
  @AutoMap()
  wardsPlaced!: number;
  @AutoMap()
  win!: boolean;
}
export class PerksDto {
  statPerks!: PerkStatsDto;
  styles!: PerkStyleDto[];
}
export class PerkStatsDto {
  @AutoMap()
  defense!: number;
  @AutoMap()
  flex!: number;
  @AutoMap()
  offense!: number;
}
export class PerkStyleDto {
  @AutoMap({ typeFn: () => String })
  description!: Description;
  selections!: PerkStyleSelectionDto[];
  @AutoMap()
  style!: number;
}
export class PerkStyleSelectionDto {
  @AutoMap()
  perk!: number;
  @AutoMap()
  var1!: number;
  @AutoMap()
  var2!: number;
  @AutoMap()
  var3!: number;
}
export class TeamDto {
  bans!: BanDto[];
  objectives!: ObjectivesDto;
  @AutoMap()
  teamId!: number;
  @AutoMap()
  win!: boolean;
}
export class BanDto {
  @AutoMap()
  championId!: number;
  @AutoMap()
  pickTurn!: number;
}
export class ObjectivesDto {
  baron!: ObjectiveDto;
  champion!: ObjectiveDto;
  dragon!: ObjectiveDto;
  inhibitor!: ObjectiveDto;
  riftHerald!: ObjectiveDto;
  tower!: ObjectiveDto;
}
export class ObjectiveDto {
  @AutoMap()
  first!: boolean;
  @AutoMap()
  kills!: number;
}
type Description = 'primaryStyle' | 'subStyle';
type Position = '' | 'Invalid' | 'TOP' | 'JUNGLE' | 'MIDDLE' | 'BOTTOM' | 'UTILITY';
type Role = 'SOLO' | 'NONE' | 'CARRY' | 'SUPPORT';
type Lane = 'TOP' | 'JUNGLE' | 'MIDDLE' | 'BOTTOM';