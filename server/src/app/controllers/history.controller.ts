import { Request, Response } from 'express';
import { HistoryService } from '../services/history.service';

export const getHistory = (req: Request, res: Response) =>
  res.json(HistoryService.getHistory());

export const addHistory = (req: Request, res: Response) => {
  HistoryService.addHistory(req.body);
  res.json({ status: 'added' });
};
