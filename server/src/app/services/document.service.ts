import { DocumentRepository } from '../repositories/document.repository';

export const DocumentService = {
  getDocument: (id: string) => DocumentRepository.getDocument(id),

  addDocument: (title: string, content: string, folderId: string) =>
    DocumentRepository.addDocument(title, content, folderId),

  deleteDocument: (id: string) => DocumentRepository.deleteDocument(id),

  updateDocument: (id: string, content: string) => {
    return DocumentRepository.updateDocument(id, content);
  },
};
