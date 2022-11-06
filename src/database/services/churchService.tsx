import { Connection } from "typeorm";
import ChurchModel, { Church } from "../entities/Church";
import { ChurchRepository } from "../repositories/ChurchRepository";

function useChurchService(connection: Connection) {
  const churchRepository = new ChurchRepository(connection);

  const create = async (data: Church) => {
    return await churchRepository.create(data);
  };

  const update = async (id: string, data: Partial<ChurchModel>) => {
    return await churchRepository.update(id, data);
  };

  const deleteChurch = async (id: string) => {
    await churchRepository.delete(id);
  };

  const getAll = async () => {
    return await churchRepository.getAll();
  };

  const getOne = async (id: string) => {
    return await churchRepository.getOne(id);
  };

  return {
    create,
    update,
    deleteChurch,
    getAll,
    getOne,
  };
}

export default useChurchService;
