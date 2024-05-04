import { PriorityEnum } from './priority';

export interface Task {
  id: string;
  description: string;
  priority: PriorityEnum;
  createdAt: Date;
  finishedAt?: Date;
}

export function generateUniqueId(): string {
  const timestamp: number = new Date().getTime();
  const randomString: string = Math.random().toString(36).substr(2, 9);
  return `${timestamp}-${randomString}`;
}
