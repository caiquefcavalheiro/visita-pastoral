import { Connection, Repository } from "typeorm";
import PastoralVisitModel from "../entities/PastoralVisit";

export class PastoralVisitRepository {
  private ormRepository: Repository<PastoralVisitModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(PastoralVisitModel);
  }

  public async getAll(): Promise<PastoralVisitModel[]> {
    const pastoral = await this.ormRepository.find();

    return pastoral;
  }

  public async getOne(id: string) {
    const pastoral = await this.ormRepository.findOne(id);

    return pastoral;
  }

  public async create({
    data,
  }: {
    data: PastoralVisitModel;
  }): Promise<PastoralVisitModel> {
    const pastoral = this.ormRepository.create(data);

    await this.ormRepository.save(pastoral);

    return pastoral;
  }

  public async update(id: string, data: Partial<PastoralVisitModel>) {
    return this.ormRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
