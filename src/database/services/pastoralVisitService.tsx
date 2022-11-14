import { Connection } from "typeorm";
import {
  PastoralVisit,
  PastoralVisitModel,
} from "../entities/FamilieChurchPersonSermon";
import { FamilieRepository } from "../repositories/FamilieRepository";
import { PastoralVisitRepository } from "../repositories/PastoralVisitRepository";

function usePastoralVisitService(connection: Connection) {
  const familieRepository = new FamilieRepository(connection);
  const pastoralVisitRepository = new PastoralVisitRepository(connection);

  const create = async (data: PastoralVisit, familieId: string) => {
    const newPastoralVisitModel = { ...data };
    const familie = await familieRepository.getOne(familieId);

    if (familie) {
      newPastoralVisitModel.familie = familie;
    }

    return await pastoralVisitRepository.create({
      data: newPastoralVisitModel,
    });
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
