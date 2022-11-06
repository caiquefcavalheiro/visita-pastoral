import { Connection, Repository } from "typeorm";
import { Church, ChurchModel } from "../entities/FamilieChurchPerson";

export class ChurchRepository {
  private ormRepository: Repository<ChurchModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(ChurchModel);
  }

  public async getAll(): Promise<ChurchModel[]> {
    const church = await this.ormRepository.find();

    return church;
  }

  public async getOne(id: string) {
    const church = await this.ormRepository.findOne(id);

    return church;
  }

  public async create({ image, name }: Church): Promise<ChurchModel> {
    const church = this.ormRepository.create({
      name,
      image,
    });

    await this.ormRepository.save(church);

    return church;
  }

  public async update(id: string, data: Partial<ChurchModel>) {
    return this.ormRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
