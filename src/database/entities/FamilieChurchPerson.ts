import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SermonModel } from "./Sermon";

export type Familie = {
  id?: string;
  name: string;
  image: string;
  church?: ChurchModel;
  persons?: PersonModel[];
};

export type Church = {
  id?: string;
  name: string;
  image: string;
  families?: FamilieModel[];
  sermon?: SermonModel;
};
@Entity("church")
export class ChurchModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => FamilieModel, ({ church }) => church, {
    eager: true,
  })
  families: FamilieModel[];

  @OneToOne(() => SermonModel, {
    eager: true,
  })
  @JoinColumn()
  sermon: SermonModel;
}

@Entity("familie")
export class FamilieModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @ManyToOne(() => ChurchModel, ({ families }) => families, {
    onDelete: "CASCADE",
    nullable: true,
  })
  church: ChurchModel;

  @OneToMany(() => PersonModel, (person) => person.familie, {
    eager: true,
  })
  persons: PersonModel[];
}

export type Person = {
  id?: string;
  name: string;
  familie?: FamilieModel;
};

@Entity("person")
export class PersonModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => FamilieModel, (familie) => familie.persons)
  familie: FamilieModel;
}
