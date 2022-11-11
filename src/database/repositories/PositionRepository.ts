import { Connection, Repository } from "typeorm";
import {
  ChurchModel,
  Position,
  PositionModel,
} from "../entities/FamilieChurchPersonSermon";

export class PositionRepository {
  private ormRepository: Repository<PositionModel>;
  private churchRepository: Repository<ChurchModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(PositionModel);

    this.churchRepository = connection.getRepository(ChurchModel);
  }

  public async getAll(): Promise<PositionModel[]> {
    const position = await this.ormRepository
      .createQueryBuilder("position")
      .leftJoinAndSelect("position.persons", "person")
      .leftJoinAndSelect("position.church", "church")
      .getMany();

    return position;
  }

  public async getOne(id: string) {
    const position = await this.ormRepository.findOne(id);

    return position;
  }

  public async create({ data }: { data: Position }): Promise<PositionModel> {
    const position = this.ormRepository.create(data);

    await this.ormRepository.save(position);

    return position;
  }

  public async createMany({ data }: { data: Position[] }, churchId: string) {
    const church = await this.churchRepository.findOne(churchId);

    for (let position of data) {
      const newPosition = { ...position, church };
      this.ormRepository.create(newPosition);

      await this.ormRepository.save(newPosition);
    }
  }

  public async getAllPositionsOfChurch(churchId: string) {
    const person = await this.ormRepository
      .createQueryBuilder("position")
      .leftJoinAndSelect("position.persons", "person")
      .leftJoinAndSelect("position.church", "church")
      .where("position.church = :churchId", { churchId })
      .getMany();

    return person;
  }

  public async update(id: string, data: Partial<PositionModel>) {
    return this.ormRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
