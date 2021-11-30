import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PerkStyleSelection {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public perk!: number;
  @Column()
  public var1!: number;
  @Column()
  public var2!: number;
  @Column()
  public var3!: number;
}