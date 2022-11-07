import { Connection } from "typeorm";
import { Person, PersonModel } from "../entities/FamilieChurchPerson";
import { FamilieRepository } from "../repositories/FamilieRepository";
import { PersonRepository } from "../repositories/PersonRepository";

function usePersonService(connection: Connection) {
  const personRepository = new PersonRepository(connection);
  const familieRepository = new FamilieRepository(connection);

  const create = async (data: Person, idFamilie: string) => {
    const newPerson = { ...data };
    const familie = await familieRepository.getOne(idFamilie);

    if (familie) {
      newPerson.familie = familie;
    }

    return await personRepository.create({ data: newPerson });
  };

  const update = async (id: string, data: Partial<PersonModel>) => {
    return await personRepository.update(id, data);
  };

  const deletePerson = async (id: string) => {
    await personRepository.delete(id);
  };

  const getAll = async () => {
    return await personRepository.getAll();
  };

  const getOne = async (id: string) => {
    return await personRepository.getOne(id);
  };

  return {
    create,
    update,
    deletePerson,
    getAll,
    getOne,
  };
}

export default usePersonService;
