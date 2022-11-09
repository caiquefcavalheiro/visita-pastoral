import { Connection, Repository } from "typeorm";
import { Position, PositionModel } from "../entities/FamilieChurchPersonSermon";

export class PositionRepository {
  private ormRepository: Repository<PositionModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(PositionModel);
  }

  public async getAll(): Promise<PositionModel[]> {
    const position = await this.ormRepository
      .createQueryBuilder("position")
      .leftJoinAndSelect("position.persons", "person")
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

  public async createMany({ data }: { data: Position[] }) {
    await this.ormRepository
      .createQueryBuilder()
      .insert()
      .into(PositionModel)
      .values(data)
      .execute();
  }

  public async update(id: string, data: Partial<PositionModel>) {
    return this.ormRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
