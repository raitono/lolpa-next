import { BaseEntity, Entity, Column, Index, ManyToOne, PrimaryColumn } from "typeorm";
import { GameMap } from "./gameMap";

@Entity()
export class GameQueue extends BaseEntity {
  @PrimaryColumn()
  @Index({ unique: true })
  public queueId!: number;
  @ManyToOne(type => GameMap, m => m.queues)
  public map!: Promise<GameMap>;
  @Column()
  public description: string | undefined;
  @Column()
  public notes: string | undefined;
}