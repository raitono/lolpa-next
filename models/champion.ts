import { RiotImage } from "./riot-image";

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
