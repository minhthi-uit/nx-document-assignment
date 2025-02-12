import { SearchRepository } from '../repositories/search.repository';

export const SearchService = {
  search: (query: string) => SearchRepository.search(query),
};
