import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PersonModel, ChurchModel } from "./index";

export type Familie = {
  id?: string;
  name: string;
  image: string;
  church?: ChurchModel;
  persons?: PersonModel[];
};

@Entity("familie")
export default class FamilieModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @ManyToOne(() => ChurchModel, (familie) => familie.families, {
    onDelete: "CASCADE",
  })
  church: ChurchModel;

  @OneToMany(() => PersonModel, (person) => person.familie, {
    eager: true,
  })
  persons: PersonModel[];
}
