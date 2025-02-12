import { FolderRepository } from '../repositories/folder.repository';

export const FolderService = {
  getFolders: () => FolderRepository.getFolders(),

  getDocumentsByFolder: (folderId: string) =>
    FolderRepository.getDocumentsByFolder(folderId),

  addFolder: (name: string) => FolderRepository.addFolder(name),

  deleteFolder: (id: string) => FolderRepository.deleteFolder(id),
};
