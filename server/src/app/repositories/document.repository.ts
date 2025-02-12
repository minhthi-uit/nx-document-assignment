import { Document } from '@nx-document-assignment/shared-models';
import { v4 as uuidv4 } from 'uuid';
import { documentBase } from '../data/mockDatabase';

export const DocumentRepository = {
  getDocument: (id: string): Document | null =>
    documentBase.documents.find((doc) => doc.id === id) || null,

  addDocument: (
    title: string,
    content: string,
    folderId: string
  ): Document | null => {
    const folderExists = documentBase.folders.some(
      (folder) => folder.id === folderId
    );
    if (!folderExists) {
      return null;
    }

    const id = uuidv4();
    const newDocument: Document = {
      id,
      title,
      content,
      folderId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    documentBase.documents.push(newDocument);
    return newDocument;
  },

  deleteDocument: (id: string): boolean => {
    const index = documentBase.documents.findIndex((doc) => doc.id === id);
    if (index === -1) return false;
    documentBase.documents.splice(index, 1);
    return true;
  },

  updateDocument: (id: string, content: string): Document | null => {
    if (!id || typeof id !== 'string') return null;
    if (!content || typeof content !== 'string') return null;

    const index = documentBase.documents.findIndex((doc) => doc.id === id);
    if (index === -1) return null;

    if (documentBase.documents[index].content === content) {
      return documentBase.documents[index];
    }

    documentBase.documents[index] = {
      ...documentBase.documents[index],
      content,
      updatedAt: Date.now(),
    };

    return documentBase.documents[index];
  },
};
