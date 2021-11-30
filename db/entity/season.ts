import { BaseEntity, Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
@Index(["id", "season"], { unique: true })
export class Season extends BaseEntity {
  @PrimaryColumn()
  public id!: number;
  @Column()
  public season!: string;
}
