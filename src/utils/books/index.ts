import { Genre } from '@prisma/client';

export function isValidGenre(genre: string): boolean {
  return Object.values(Genre).includes(genre as Genre);
}

export function isBookUnique(): boolean {
  return true;
}
