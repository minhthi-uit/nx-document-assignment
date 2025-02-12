import { Request, Response } from 'express';
import { SearchService } from '../services/search.service';

export const search = (req: Request, res: Response) =>
  res.json(SearchService.search(req.query.query as string));
