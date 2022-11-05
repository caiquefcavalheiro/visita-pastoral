import { Connection, Repository } from "typeorm";
import { ChurchModel } from "../entities/Church";

interface ICreateChurchData {
  name: string;
  imageChurch: string;
}

export class ChurchRepository {
  private ormRepository: Repository<ChurchModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(ChurchModel);
  }

  public async getAll(): Promise<ChurchModel[]> {
    const church = await this.ormRepository.find();

    return church;
  }

  public async create({
    imageChurch,
    name,
  }: ICreateChurchData): Promise<ChurchModel> {
    const church = this.ormRepository.create({
      name,
      imageChurch,
    });

    await this.ormRepository.save(church);

    return church;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
