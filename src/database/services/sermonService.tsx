import { Connection } from "typeorm";
import { SermonModel } from "../entities/FamilieChurchPersonSermon";
import { ChurchRepository } from "../repositories/ChurchRepository";
import { SermonRepository } from "../repositories/SermonRepository";

function useSermonService(connection: Connection) {
  const sermonRepository = new SermonRepository(connection);
  const churchRepository = new ChurchRepository(connection);

  const create = async (data: SermonModel, churchId: string) => {
    const newSermon = { ...data };
    const church = await churchRepository.getOne(churchId);

    if (church) {
      newSermon.church = church;
    }

    return await sermonRepository.create({ data: newSermon });
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
