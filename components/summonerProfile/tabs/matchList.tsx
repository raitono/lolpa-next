import { useEffect, useState } from "react";
import { MatchV5DTOs } from "twisted/dist/models-dto";
import RiotRunesDto from "../../../models/riot/riotRunesDto";
import RiotSummonerSpellMapping from "../../../models/riot/riotSummonerSpellMapping";

interface MatchListProps {
  summonerName: string;
}

interface MatchSummaryProps {
  summonerName: string;
  match: MatchV5DTOs.MatchDto;
  runes: RiotRunesDto[];
}

enum TeamPosition {
  "TOP" = "TOP",
  "JUNGLE" = "JUNGLE",
  "MIDDLE" = "MIDDLE",
  "BOTTOM" = "BOTTOM",
  "UTILITY" = "UTILITY",
  "BLANK" = "",
}

let usedBlankParticipants: { matchId: string, participantId: number }[] = [];

const MatchList: React.FC<MatchListProps> = ({ summonerName }: MatchListProps) => {
  const [matches, setMatches] = useState<MatchV5DTOs.MatchDto[]>();
  const [runes, setRunes] = useState<RiotRunesDto[]>();

  useEffect(() => {
    if (summonerName) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/summoner/NA1/${summonerName}/recent-matches`)
        .then(res => res.json())
        .then(setMatches);
    }
  }, [summonerName]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/data-dragon/runes`)
      .then(res => res.json())
      .then(setRunes);
  }, []);

  if (matches && runes) {
    return (
      <>
        {matches.map(m => <MatchSummary key={m.metadata.matchId} match={m} summonerName={summonerName} runes={runes} />)}
      </>
    );
  }

  return (
    <>
      <div>Loading matches for {summonerName}...</div>
    </>
  );
};

const MatchSummary: React.FC<MatchSummaryProps> = ({ summonerName, match, runes }: MatchSummaryProps) => {
  const participant = match.info.participants.filter(p => p.summonerName === summonerName).shift();

  if (!participant) {
    return (
      <>
        <div>Summoner "{summonerName}" not found in match...</div>
      </>
    );
  }

  const team = match.info.teams.filter(t => t.teamId === participant.teamId).shift()!;

  const primaryStyle = participant.perks.styles.find(s => s.description === "primaryStyle");
  const keystoneId = primaryStyle?.selections[0].perk;
  const keystoneIcon = runes.find(r => r.id === primaryStyle?.style)?.slots[0].runes.find(r => r.id === keystoneId)?.icon;
  const secondaryIcon = runes.find(r => r.id === participant.perks.styles.find(s => s.description === "subStyle")?.style)?.icon;
  const blueTeam = match.info.teams.find(t => t.teamId === 100)!;
  const redTeam = match.info.teams.find(t => t.teamId === 200)!;

  const teamInfo = [
    {
      alt: "blue baron",
      src: "/objectives/icon-blue-baron.png",
      kills: blueTeam.objectives.baron.kills
    },
    {
      alt: "blue dragon",
      src: "/objectives/icon-blue-dragon.png",
      kills: blueTeam.objectives.dragon.kills
    },
    {
      alt: "blue tower",
      src: "/objectives/icon-blue-tower.png",
      kills: blueTeam.objectives.tower.kills
    },
    {
      alt: "blue inhib",
      src: "/objectives/icon-blue-inhib.png",
      kills: blueTeam.objectives.inhibitor.kills
    },
    null,
    {
      alt: "red baron",
      src: "/objectives/icon-red-baron.png",
      kills: redTeam.objectives.baron.kills
    },
    {
      alt: "red dragon",
      src: "/objectives/icon-red-dragon.png",
      kills: redTeam.objectives.dragon.kills
    },
    {
      alt: "red tower",
      src: "/objectives/icon-red-tower.png",
      kills: redTeam.objectives.tower.kills
    },
    {
      alt: "red inhib",
      src: "/objectives/icon-red-inhib.png",
      kills: redTeam.objectives.inhibitor.kills
    },
  ];

  return (
    <>
      <div data-match-win={team.win}>{/* theme div */}
        <div className="flex items-center my-1 py-2 border win:border-nord14/80 loss:border-nord11/50">{/* content border/bg */}
          <div className="flex flex-col items-center w-[175px]">{/* Result and items */}
            <div className=" text-xl px-2 py-1 mb-1 win:bg-nord14/50 loss:bg-nord11/50">{team.win ? "Victory" : "Defeat"}</div>
            <div>{participant.totalMinionsKilled} CS ({(participant.totalMinionsKilled / (match.info.gameDuration / 60)).toFixed(2)} CS/M)</div>
            <div>{participant.kills}/{participant.deaths}/{participant.assists} ({(participant.kills + participant.assists / (participant.deaths || 1)).toFixed(2)} KD/A)</div>
            <div className="grid grid-cols-4 grid-rows-2 items-center gap-1 mt-2">
              {generateItem(0, participant.item0)}
              {generateItem(1, participant.item1)}
              {generateItem(2, participant.item2)}
              <span className="row-span-2">{generateItem(6, participant.item6)}</span>
              {generateItem(3, participant.item3)}
              {generateItem(4, participant.item4)}
              {generateItem(5, participant.item5)}
            </div>
          </div>
          <div className="mx-2 mb-3 relative"> {/* Champion Icon and spells */}
            <img alt="champion" className="w-[160px] h-[160px] rounded-full" src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/champion/${participant.championName}.png`} />
            <div className="flex absolute -bottom-1 -left-1 items-end">
              <div className="flex items-center justify-center text-3xl font-medium w-12 h-12 rounded-full bg-nord6">{participant.champLevel}</div>
              <img alt="summoner spell 1" className="w-9 h-9" src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/spell/${RiotSummonerSpellMapping[participant.summoner1Id]}.png`} />
              <img alt="summoner spell 2" className="w-9 h-9" src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/spell/${RiotSummonerSpellMapping[participant.summoner2Id]}.png`} />
              <div className="flex">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-nord6 relative">
                  <img alt="keystone mastery" className="w-10 h-10" src={`https://ddragon.leagueoflegends.com/cdn/img/${keystoneIcon}`} />
                </div>
                <div className="flex items-center justify-center w-7 h-7 rounded-full absolute -bottom-0.5 -right-1 bg-nord4">
                  <img alt="secondary mastery" className="w-5 h-5" src={`https://ddragon.leagueoflegends.com/cdn/img/${secondaryIcon}`} />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-9 grid-rows-team-info gap-x-1 w-[250px]"> {/* Team information */}
            {teamInfo.map(i => {
              if (i) {
                return (
                  <div className="flex flex-col bg-nord5 items-center mb-1">
                    <img alt={i.alt} className="h-5 w-5" src={i.src} />
                    <div>{i.kills}</div>
                  </div>
                )
              } else {
                return <div>{/* empty div for middle space */}</div>
              }
            })}
            {generateTeamInfoRow(match, TeamPosition.TOP)}
            {generateTeamInfoRow(match, TeamPosition.JUNGLE)}
            {generateTeamInfoRow(match, TeamPosition.MIDDLE)}
            {generateTeamInfoRow(match, TeamPosition.BOTTOM)}
            {generateTeamInfoRow(match, TeamPosition.UTILITY)}
          </div>
        </div>
      </div>
    </>
  );
};

const generateItem = (itemIndex: number, itemId: number) => {
  if (itemId) {
    return <img alt={`item ${itemIndex}`} className="w-9 h-9 rounded-lg" src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/item/${itemId}.png`} />
  } else {
    return <div className="w-9 h-9 rounded-lg bg-nord5"></div>
  }
};

const generateTeamInfoRow = (match: MatchV5DTOs.MatchDto, position: TeamPosition) => {
  let blueSide: MatchV5DTOs.ParticipantDto | undefined = participantByPosition(match, 100, position);
  let redSide: MatchV5DTOs.ParticipantDto | undefined = participantByPosition(match, 200, position);

  return (
    <>
      <div className="col-span-3 truncate">{blueSide?.summonerName}</div>
      <span className="flex justify-center"><img alt={`${blueSide?.teamPosition} champion`} className="w-6 h-6 rounded-full" src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/champion/${blueSide?.championName}.png`} /></span>
      <span className="flex justify-center"><img alt={`${blueSide?.teamPosition} lane`} className="w-6 h-6 rounded-full bg-nord5" src={`/positions/${blueSide?.teamPosition}.png`} /></span>
      <span className="flex justify-center"><img alt={`${redSide?.teamPosition} champion`} className="w-6 h-6 rounded-full" src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/champion/${redSide?.championName}.png`} /></span>
      <div className="col-span-3 truncate">{redSide?.summonerName}</div>
    </>
  )
};

const participantByPosition = (match: MatchV5DTOs.MatchDto, teamId: number, teamPosition: TeamPosition) => {
  const participant = match.info.participants.find(p => p.teamId === teamId && p.teamPosition === teamPosition)
    || match.info.participants.find(p => p.teamId === teamId && p.teamPosition === TeamPosition.BLANK && !usedBlankParticipants.includes({ matchId: match.metadata.matchId, participantId: p.participantId }));

  if (participant?.teamPosition === TeamPosition.BLANK) {
    usedBlankParticipants.push({ matchId: match.metadata.matchId, participantId: participant.participantId });
  }

  return participant;
};

export default MatchList;