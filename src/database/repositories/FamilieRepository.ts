import { Connection, Repository } from "typeorm";
import { Familie, FamilieModel } from "../entities/FamilieChurchPersonSermon";

export class FamilieRepository {
  private ormRepository: Repository<FamilieModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(FamilieModel);
  }

  public async getAll(): Promise<FamilieModel[]> {
    const families = await this.ormRepository
      .createQueryBuilder("familie")
      .leftJoinAndSelect("familie.church", "church")
      .leftJoinAndSelect("familie.persons", "persons")
      .getMany();

    return families;
  }

  public async getOne(id: string) {
    const familie = await this.ormRepository.findOne(id);

    return familie;
  }

  public async create({ data }: { data: Familie }): Promise<FamilieModel> {
    const familie = this.ormRepository.create(data);

    await this.ormRepository.save(familie);

    return familie;
  }

  public async update(id: string, data: Partial<FamilieModel>) {
    return this.ormRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
