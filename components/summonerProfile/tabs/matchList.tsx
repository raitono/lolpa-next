import { useEffect, useState } from "react";
import Link from 'next/link';
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

const GameQueues = [
  {
    queueId: 420,
    queueName: "Ranked Solo"
  }
]

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
    if (matches.length) {
      return (
        <div className="mt-4">
          {matches.map(m => <MatchSummary key={m.metadata.matchId} match={m} summonerName={summonerName} runes={runes} />)}
        </div>
      );
    } else {
      return <div className="text-center font-bold text-3xl text-on-background-default">No matches found for {summonerName}</div>
    }
  }

  return (
    <div className="text-center font-bold text-3xl text-on-background-default">Loading matches for {summonerName}...</div>
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
  const gameTime = new Date();
  gameTime.setUTCHours(0, 0, match.info.gameDuration, 0);

  return (
    <div className="match" data-win={team.win}>{/* theme div */}
      <div className="my-2 bg-background-default text-on-background-default border win:border-success-default loss:border-error-default">{/* content border/bg */}
        <div className="grid grid-cols-3 justify-items-center w-full win:bg-success-default loss:bg-error-default">
          <div>{`${gameTime.toISOString().substr(11, 8)}`}</div>
          <div>{match.info.gameVersion.split('.', 2).join('.')}</div>
          <div>{GameQueues.find(q => q.queueId === match.info.queueId)?.queueName}</div>
        </div>
        <div className="flex justify-between p-2">
          <div className="flex-shrink-0 flex flex-col items-center">{/* Result and items */}
            <div className=" text-xl px-2 py-1 mb-1 win:bg-success-default loss:bg-error-default">{team.win ? "Victory" : "Defeat"}</div>
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
          <div className="flex-shrink-0 mx-2 mb-3 relative"> {/* Champion Icon and spells */}
            <img alt="champion" className="w-[160px] h-[160px] rounded-full border-2 border-on-background-muted" src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/champion/${participant.championName}.png`} />
            <div className="flex absolute -bottom-1 -left-1 items-end">
              <div className="flex items-center justify-center text-3xl font-medium w-12 h-11 rounded-full bg-foreground-default border-2 border-on-background-muted">{participant.champLevel}</div>
              <img alt="summoner spell 1" className="w-9 h-9" src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/spell/${RiotSummonerSpellMapping[participant.summoner1Id]}.png`} />
              <img alt="summoner spell 2" className="w-9 h-9" src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/spell/${RiotSummonerSpellMapping[participant.summoner2Id]}.png`} />
              <div className="flex">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-foreground-default relative border-2 border-on-background-muted">
                  <img alt="keystone mastery" className="w-10 h-10" src={`https://ddragon.leagueoflegends.com/cdn/img/${keystoneIcon}`} />
                </div>
                <div className="flex items-center justify-center w-7 h-7 rounded-full absolute -bottom-0.5 -right-1 bg-on-foreground-default">
                  <img alt="secondary mastery" className="w-5 h-5" src={`https://ddragon.leagueoflegends.com/cdn/img/${secondaryIcon}`} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink max-w-[300px] grid grid-cols-9 grid-rows-team-info gap-x-1"> {/* Team information */}
            {teamInfo.map((i, idx) => {
              if (i) {
                return (
                  <div key={idx} className="flex flex-col bg-foreground-default items-center mb-1">
                    <img alt={i.alt} className="mt-1 h-5 w-5" src={i.src} />
                    <div>{i.kills}</div>
                  </div>
                )
              } else {
                return <div key={idx}>{/* empty div for middle space */}</div>
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
    </div>
  );
};

const generateItem = (itemIndex: number, itemId: number) => {
  if (itemId) {
    return <img alt={`item ${itemIndex}`} className="w-9 h-9 rounded-lg border border-on-background-muted" src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/item/${itemId}.png`} />
  } else {
    return <div className="w-9 h-9 rounded-lg bg-foreground-default border border-on-background-muted"></div>
  }
};

const generateTeamInfoRow = (match: MatchV5DTOs.MatchDto, position: TeamPosition) => {
  let blueSide: MatchV5DTOs.ParticipantDto | undefined = participantByPosition(match, 100, position);
  let redSide: MatchV5DTOs.ParticipantDto | undefined = participantByPosition(match, 200, position);

  return (
    <>
      <Link href={`/summoner/${blueSide?.summonerName}`}><a className="col-span-3 pl-1 truncate bg-foreground-default">{blueSide?.summonerName}</a></Link>
      <span className="flex justify-center"><img alt={`${blueSide?.teamPosition} champion`} className="w-6 h-6 rounded-full" src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/champion/${blueSide?.championName}.png`} /></span>
      <span className="flex justify-center"><img alt={`${blueSide?.teamPosition} lane`} className="w-6 h-6 rounded-full bg-foreground-default" src={`/positions/${blueSide?.teamPosition}.png`} /></span>
      <span className="flex justify-center"><img alt={`${redSide?.teamPosition} champion`} className="w-6 h-6 rounded-full" src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_CURRENT_PATCH}/img/champion/${redSide?.championName}.png`} /></span>
      <Link href={`/summoner/${redSide?.summonerName}`}><a className="col-span-3 pl-1 truncate bg-foreground-default">{redSide?.summonerName}</a></Link>
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