import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type PastoralVisit = {
  id?: string;
  quiz: string;
};

@Entity("pastoral_visit")
export class PastoralVisitModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quiz: string;
}
