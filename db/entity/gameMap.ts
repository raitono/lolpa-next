import { BaseEntity, Entity, Column, Index, OneToMany, PrimaryColumn } from "typeorm";
import { GameQueue } from "./gameQueue";

@Entity()
export class GameMap extends BaseEntity {
  @OneToMany(type => GameQueue, q => q.map)
  public queues!: Promise<GameQueue>;

  @PrimaryColumn()
  @Index({ unique: true })
  public mapId!: number;
  @Column()
  @Index({ unique: true })
  public mapName!: string;
  @Column()
  public notes!: string;
}