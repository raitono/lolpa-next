import { RiotImage } from "./riotImage";

export interface IChampion {
  id: string,
  name: string,
  title: string;
  image: RiotImage,
  skins: IChampionSkin[],
  tags: string[]
}

interface IChampionSkin {

}
