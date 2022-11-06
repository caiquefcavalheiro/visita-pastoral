import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FamilieModel } from "./index";

export type Person = {
  id?: string;
  name: string;
  familie?: FamilieModel;
};

@Entity("person")
export default class PersonModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => FamilieModel, (familie) => familie.persons)
  familie: FamilieModel;
}
