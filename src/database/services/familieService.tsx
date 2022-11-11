import { Connection } from "typeorm";
import { Familie, PersonModel } from "../entities/FamilieChurchPersonSermon";

import { ChurchRepository } from "../repositories/ChurchRepository";
import { FamilieRepository } from "../repositories/FamilieRepository";
import { PersonRepository } from "../repositories/PersonRepository";

function useFamilieService(connection: Connection) {
  const familieRepository = new FamilieRepository(connection);
  const personRepository = new PersonRepository(connection);
  const churchRepository = new ChurchRepository(connection);

  const create = async (
    data: Familie,
    churchId: string,
    personsId: string[] = []
  ) => {
    const newFamilie = { ...data };
    const church = await churchRepository.getOne(churchId);
    const persons = await Promise.all(
      personsId.map(async (personId) => await personRepository.getOne(personId))
    );

    const filteredPersons = persons?.filter((ele) => !!ele) as PersonModel[];

    if (church) {
      newFamilie.church = church;
    }

    if (filteredPersons?.length) {
      newFamilie.persons = filteredPersons;
    }

    return await familieRepository.create({ data: newFamilie });
  };

  const update = async (id: string, data: Partial<Familie>) => {
    return await familieRepository.update(id, data);
  };

  const deleteFamilie = async (id: string) => {
    await familieRepository.delete(id);
  };

  const getAll = async () => {
    return await familieRepository.getAll();
  };

  const getOne = async (id: string) => {
    return await familieRepository.getOne(id);
  };

  const getAllFamiliesOfChurch = async (churchId: string) => {
    return await familieRepository.getAllFamiliesOfChurch(churchId);
  };

  return {
    create,
    update,
    deleteFamilie,
    getAll,
    getOne,
    getAllFamiliesOfChurch,
  };
}

export default useFamilieService;
