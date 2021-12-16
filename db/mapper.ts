import { createMapper, ignore, mapFrom } from '@automapper/core';
import { classes } from '@automapper/classes';
import { InfoDto, MatchDto, MetadataDto, ParticipantDto } from '../models/matchDto';
import { Match } from './entity/match';
import { Participant } from './entity/participant';

export const mapper = createMapper({
  name: 'RiotDTOToEntity',
  pluginInitializer: classes,
});

mapper.createMap(ParticipantDto, Participant)
  .forMember(d => d.perkStyle, ignore())
  .forMember(d => d.perkStyleSelections, ignore())
  // .forMember(d => d.perkStyleDescription, mapFrom(s => s.perks.styles[0].description))
  // .forMember(d => d.flexPerk, mapFrom(s => s.perks.statPerks.flex))
  // .forMember(d => d.defensePerk, mapFrom(s => s.perks.statPerks.defense))
  // .forMember(d => d.offensePerk, mapFrom(s => s.perks.statPerks.offense))
  .forMember(d => d.perkStyleDescription, ignore())
  .forMember(d => d.flexPerk, ignore())
  .forMember(d => d.defensePerk, ignore())
  .forMember(d => d.offensePerk, ignore())
  ;

mapper.createMap(MatchDto, Match, { extends: [mapper.getMapping(ParticipantDto, Participant)] })
  .forSelf(MetadataDto, s => s.metadata)
  .forSelf(InfoDto, s => s.info)
  .forMember(
    d => d.teams,
    ignore()
  )
  ;