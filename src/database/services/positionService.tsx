import { Connection } from "typeorm";
import { Position, PositionModel } from "../entities/FamilieChurchPersonSermon";
import { PositionRepository } from "../repositories/PositionRepository";

function usePositionService(
  connection: Connection,
  defaultPositionRepository?: PositionRepository
) {
  const positionRepository =
    defaultPositionRepository || new PositionRepository(connection);

  const update = async (id: string, data: Partial<PositionModel>) => {
    return await positionRepository.update(id, data);
  };

  const deleteChurch = async (id: string) => {
    await positionRepository.delete(id);
  };

  const getAll = async () => {
    return await positionRepository.getAll();
  };

  const create = async (data: Position) => {
    return await positionRepository.create({ data });
  };

  const createMany = async (data: Position[], churchId: string) => {
    const positions = await getAllPositionsOfChurch(churchId);

    if (!positions?.length) {
      await positionRepository.createMany({ data }, churchId);
    }
  };

  const getAllPositionsOfChurch = async (churchId: string) => {
    return await positionRepository.getAllPositionsOfChurch(churchId);
  };

  const getOne = async (id: string) => {
    return await positionRepository.getOne(id);
  };

  return {
    createMany,
    update,
    deleteChurch,
    getAll,
    getOne,
    create,
    getAllPositionsOfChurch,
  };
}

export default usePositionService;
