import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { SermonModel, FamilieModel } from "./index";

export type Church = {
  id?: string;
  name: string;
  image: string;
  families?: FamilieModel[];
  sermon?: SermonModel;
};
@Entity("church")
export default class ChurchModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => FamilieModel, (church) => church.church, {
    eager: true,
  })
  families: FamilieModel[];

  @OneToOne(() => SermonModel, {
    eager: true,
  })
  @JoinColumn()
  sermon: SermonModel;
}
