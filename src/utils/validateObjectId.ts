import { Types } from 'mongoose';

export function validateObjectId(id: string): boolean {
  return Types.ObjectId.isValid(id);
}