import { RiotImage } from "./riot-image";

export interface ISummoner {
  puuid: string;
  name: string;
  level: number;
  summonerIcon: RiotImage;
}
