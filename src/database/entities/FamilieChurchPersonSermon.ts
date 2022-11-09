import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  @OneToMany(() => FamilieModel, ({ church }) => church, {
    eager: true,
  })
  sermons: SermonModel[];

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

export type Position = {
  id?: string;
  position: string;
  persons?: PersonModel[];
};

@Entity("position")
export class PositionModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  position: string;

  @ManyToMany(() => PersonModel, ({ positions }) => positions, {
    nullable: true,
  })
  persons: PersonModel[];
}

export type Person = {
  id?: string;
  name: string;
  familie?: FamilieModel;
  positions?: PositionModel[];
  createdAt?: Date;
};

@Entity("person")
export class PersonModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => PositionModel, ({ persons }) => persons, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  positions: PositionModel[];

  @ManyToOne(() => FamilieModel, (familie) => familie.persons)
  familie: FamilieModel;

  @CreateDateColumn()
  createdAt?: Date;
}

export type Sermon = {
  id?: string;
  name: string;
};

@Entity("sermon")
export class SermonModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ChurchModel, ({ sermons }) => sermons, {
    onDelete: "CASCADE",
    nullable: true,
  })
  church: ChurchModel;

  @CreateDateColumn()
  createdAt?: Date;
}
