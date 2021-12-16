export class Summoner {
  public internalId?: number;
  public accountId: string;
  public profileIconId: number;
  public revisionDate: number;
  public name: string;
  public id: string;
  public puuid: string;
  public summonerLevel: number;

  constructor({
    accountId,
    profileIconId,
    revisionDate,
    name,
    id,
    puuid,
    summonerLevel,
    internalId
  }: Summoner
  ) {
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
