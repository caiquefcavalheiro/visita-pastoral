import {
  Column,
  CreateDateColumn,
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
  createdAt?: Date;
};

export type Church = {
  id?: string;
  name: string;
  image: string;
  families?: FamilieModel[];
  sermon?: SermonModel;
  createdAt?: Date;
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

  @CreateDateColumn()
  createdAt?: Date;
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

  @CreateDateColumn()
  createdAt?: Date;
}

export type Person = {
  id?: string;
  name: string;
  familie?: FamilieModel;
  createdAt?: Date;
};

@Entity("person")
export class PersonModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => FamilieModel, (familie) => familie.persons)
  familie: FamilieModel;

  @CreateDateColumn()
  createdAt?: Date;
}
