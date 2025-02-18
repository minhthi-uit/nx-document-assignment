import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export interface HistoryItem {
  id: string;
  title: string;
}

export const useHistory = () => {
  const [recentDocuments, setRecentDocuments] = useState<HistoryItem[]>([]);

  const fetchHistory = async () => {
    try {
      const data = await api.getHistory();
      setRecentDocuments(data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const addToHistory = async (document: HistoryItem) => {
    try {
      await api.addToHistory(document);
      await fetchHistory();
    } catch (err) {
      console.error('Failed to add to history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    recentDocuments,
    addToHistory,
    refreshHistory: fetchHistory
  };
};