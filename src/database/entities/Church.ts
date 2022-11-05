import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("church")
export class ChurchModel {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  imageChurch: string;
}
