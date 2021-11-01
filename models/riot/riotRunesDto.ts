interface RiotRune {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
}

interface RiotRuneSlot {
  runes: RiotRune[]
}

export default interface RiotRunesDto {
  id: number;
  key: string;
  icon: string;
  slots: RiotRuneSlot[]
}
