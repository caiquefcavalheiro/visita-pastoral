import { Connection } from "typeorm";
import PastoralVisitModel from "../entities/PastoralVisit";
import { PastoralVisitRepository } from "../repositories/PastoralVisitRepository";

function usePastoralVisitService(connection: Connection) {
  const pastoralVisitRepository = new PastoralVisitRepository(connection);

  const create = async (data: PastoralVisitModel) => {
    return await pastoralVisitRepository.create({ data });
  };

  const update = async (id: string, data: Partial<PastoralVisitModel>) => {
    return await pastoralVisitRepository.update(id, data);
  };

  const deletePastoralVisit = async (id: string) => {
    await pastoralVisitRepository.delete(id);
  };

  const getAll = async () => {
    return await pastoralVisitRepository.getAll();
  };

  const getOne = async (id: string) => {
    return await pastoralVisitRepository.getOne(id);
  };

  return {
    create,
    update,
    deletePastoralVisit,
    getAll,
    getOne,
  };
}

export default usePastoralVisitService;
