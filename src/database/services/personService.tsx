import { Connection } from "typeorm";
import {
  Person,
  PersonModel,
  Position,
  PositionModel,
} from "../entities/FamilieChurchPersonSermon";
import { FamilieRepository } from "../repositories/FamilieRepository";
import { PersonRepository } from "../repositories/PersonRepository";

function usePersonService(connection: Connection) {
  const personRepository = new PersonRepository(connection);
  const familieRepository = new FamilieRepository(connection);
  const positionRepository = connection.getRepository(PositionModel);

  const personDb = connection.getRepository(PersonModel);

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

  const applyForPosition = async (userId: string, positions: Position[]) => {
    const currentUser = await personDb.findOne(userId, {
      relations: ["positions"],
    });

    console.log(currentUser?.name, "currentUser");

    if (currentUser) {
      currentUser.positions = [];
      await Promise.all(
        positions.map(async (position) => {
          const currentPosition = await positionRepository.findOne(
            position.id,
            {
              relations: ["persons"],
            }
          );

          if (currentPosition) {
            currentUser.positions.push(currentPosition);
          }
        })
      );
      await personDb.save(currentUser);

      const updatedPerson = await personRepository.getOne(userId);

      return updatedPerson;
    }
  };

  return {
    create,
    update,
    deletePerson,
    getAll,
    getOne,
    applyForPosition,
  };
}

export default usePersonService;
