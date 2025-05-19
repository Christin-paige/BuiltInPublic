import { Maybe } from "utils/types";

export interface Repository<T> {
  getById(id: string): Promise<Maybe<T>>;
  getByFilter?(filter: keyof T, value: any): Promise<Maybe<T>>;
  getAll(): Promise<Maybe<T[]>>;
  create?(data: Partial<T>): Promise<Maybe<T>>;
  update(id: string, update: Partial<T>): Promise<Maybe<T>>;
  delete?(id: string): Promise<void>;
}
