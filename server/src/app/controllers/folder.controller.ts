import { Request, Response } from 'express';
import { FolderService } from '../services/folder.service';

export const getFolders = (req: Request, res: Response) =>
  res.json(FolderService.getFolders());

export const getDocumentsByFolder = (req: Request, res: Response) =>
  res.json(FolderService.getDocumentsByFolder(req.params.id));

export const addFolder = (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Folder name is required' });
  }

  const folderExists = FolderService.getFolders().some(
    (folder) => folder.name.toLowerCase() === name.toLowerCase()
  );

  if (folderExists) {
    return res.status(400).json({ error: 'Folder already exists' });
  }

  const newFolder = FolderService.addFolder(name);
  return res.json(newFolder);
};

export const deleteFolder = (req: Request, res: Response) => {
  const success = FolderService.deleteFolder(req.params.id);
  return success
    ? res.json({ status: 'deleted' })
    : res.status(404).json({ error: 'Folder not found' });
};
