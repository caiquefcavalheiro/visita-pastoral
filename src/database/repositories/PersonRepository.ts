import { Connection, Repository } from "typeorm";
import { Person, PersonModel } from "../entities/FamilieChurchPersonSermon";

export class PersonRepository {
  private ormRepository: Repository<PersonModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(PersonModel);
  }

  public async getAll(): Promise<PersonModel[]> {
    const person = await this.ormRepository
      .createQueryBuilder("person")
      .leftJoinAndSelect("person.familie", "familie")
      .leftJoinAndSelect("person.positions", "position")
      .getMany();

    return person;
  }

  public async getAllPersonsOfChurch(churchId: string) {
    const person = await this.ormRepository
      .createQueryBuilder("person")
      .leftJoinAndSelect("person.familie", "familie")
      .leftJoinAndSelect("person.positions", "position")
      .where("familie.church = :churchId", { churchId })
      .getMany();

    return person;
  }

  public async getOne(id: string) {
    const person = await this.ormRepository
      .createQueryBuilder("person")
      .leftJoinAndSelect("person.familie", "familie")
      .leftJoinAndSelect("person.positions", "position")
      .where("person.id = :id", { id })
      .getOne();

    return person;
  }

  public async create({ data }: { data: Person }): Promise<PersonModel> {
    const person = this.ormRepository.create(data);

    await this.ormRepository.save(person);

    return person;
  }

  public async update(id: string, data: Partial<PersonModel>) {
    return this.ormRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
