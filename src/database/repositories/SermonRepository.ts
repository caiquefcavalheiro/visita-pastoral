import { Connection, Repository } from "typeorm";
import { SermonModel } from "../entities/Sermon";

export class SermonRepository {
  private ormRepository: Repository<SermonModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(SermonModel);
  }

  public async getAll(): Promise<SermonModel[]> {
    const sermon = await this.ormRepository.find();

    return sermon;
  }

  public async create({ data }: { data: SermonModel }): Promise<SermonModel> {
    const sermon = this.ormRepository.create(data);

    await this.ormRepository.save(sermon);

    return sermon;
  }

  public async update(id: string, data: Partial<SermonModel>) {
    return this.ormRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
