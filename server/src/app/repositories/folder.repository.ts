import {
  Document,
  DocumentFolder,
} from '@nx-document-assignment/shared-models';
import { documentBase } from '../data/mockDatabase';
import { v4 as uuidv4 } from 'uuid';

export const FolderRepository = {
  getFolders: (): DocumentFolder[] => documentBase.folders,

  getDocumentsByFolder: (folderId: string): Document[] => {
    return documentBase.documents.filter((doc) => doc.folderId === folderId);
  },

  addFolder: (name: string): DocumentFolder => {
    const newFolder: DocumentFolder = {
      id: uuidv4(),
      name,
      type: 'folder',
    };

    documentBase.folders.push(newFolder);
    return newFolder;
  },

  deleteFolder: (id: string): boolean => {
    const folderIndex = documentBase.folders.findIndex(
      (folder) => folder.id === id
    );
    if (folderIndex === -1) return false;

    documentBase.documents = documentBase.documents.filter(
      (doc) => doc.folderId !== id
    );

    documentBase.folders.splice(folderIndex, 1);

    return true;
  },
};
