import { BaseEntity, Entity, Column, Index, PrimaryColumn } from "typeorm";

@Entity()
export class GameMode extends BaseEntity {
  @PrimaryColumn()
  @Index({ unique: true })
  public gameMode!: string;
  @Column()
  public description!: string;
}