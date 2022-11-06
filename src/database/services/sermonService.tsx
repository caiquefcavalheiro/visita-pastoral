import { Connection } from "typeorm";
import SermonModel from "../entities/Sermon";
import { SermonRepository } from "../repositories/SermonRepository";

function useSermonService(connection: Connection) {
  const sermonRepository = new SermonRepository(connection);

  const create = async (data: SermonModel) => {
    return await sermonRepository.create({ data });
  };

  const update = async (id: string, data: Partial<SermonModel>) => {
    return await sermonRepository.update(id, data);
  };

  const deleteSermon = async (id: string) => {
    await sermonRepository.delete(id);
  };

  const getAll = async () => {
    return await sermonRepository.getAll();
  };

  return {
    create,
    update,
    deleteSermon,
    getAll,
  };
}

export default useSermonService;
