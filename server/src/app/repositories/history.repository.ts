import { DocumentHistoryEntry } from '@nx-document-assignment/shared-models';
import { documentBase } from '../data/mockDatabase';

export const HistoryRepository = {
  getHistory: (): DocumentHistoryEntry[] => documentBase.history,

  addHistory: (entry: { id: string; title: string }) => {
    const newEntry = { ...entry, timestamp: Date.now() };
    documentBase.history.unshift(newEntry);
    documentBase.history = documentBase.history.slice(0, 10);
    return newEntry;
  },
};
