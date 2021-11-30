import { BaseEntity, Entity, Column, Index, PrimaryColumn } from "typeorm";

@Entity()
export class GameType extends BaseEntity {
  @PrimaryColumn()
  @Index({ unique: true })
  public gameType!: string;
  @Column()
  public description!: string;
}