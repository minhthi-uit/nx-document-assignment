import { documentBase } from '../data/mockDatabase';

export const SearchRepository = {
  search: (query: string) =>
    documentBase.documents
      .filter(
        (doc) =>
          doc.title.toLowerCase().includes(query.toLowerCase()) ||
          doc.content.toLowerCase().includes(query.toLowerCase())
      )
      .map((doc) => ({
        id: doc.id,
        title: doc.title,
        snippet: doc.content.slice(0, 100) + '...',
      })),
};
