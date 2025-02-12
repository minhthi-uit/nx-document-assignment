import { HistoryRepository } from '../repositories/history.repository';

export const HistoryService = {
  getHistory: () => HistoryRepository.getHistory(),

  addHistory: (entry: { id: string; title: string }) =>
    HistoryRepository.addHistory(entry),
};
