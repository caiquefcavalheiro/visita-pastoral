import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type Sermon = {
  id?: string;
  name: string;
};

@Entity("sermon")
export default class SermonModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;
}