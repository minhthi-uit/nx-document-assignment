import { Request, Response } from 'express';
import { DocumentService } from '../services/document.service';

export const getDocument = (req: Request, res: Response) => {
  const doc = DocumentService.getDocument(req.params.id);
  return doc
    ? res.json(doc)
    : res.status(404).json({ error: 'Document not found' });
};

export const addDocument = (req: Request, res: Response) => {
  const { title, content, folderId } = req.body;

  if (!title || !content || !folderId) {
    return res
      .status(400)
      .json({ error: 'Title, content, and folderId are required' });
  }

  const newDoc = DocumentService.addDocument(title, content, folderId);

  if (!newDoc) {
    return res.status(400).json({ error: 'Folder not found' });
  }

  return res.json(newDoc);
};

export const deleteDocument = (req: Request, res: Response) => {
  const success = DocumentService.deleteDocument(req.params.id);
  return success
    ? res.json({ status: 'deleted' })
    : res.status(404).json({ error: 'Document not found' });
};

export const updateDocument = (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid document ID' });
  }

  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Content is required' });
  }

  const updatedDocument = DocumentService.updateDocument(id, content);

  if (!updatedDocument) {
    return res.status(404).json({ error: 'Document not found' });
  }

  return res.json(updatedDocument);
};
