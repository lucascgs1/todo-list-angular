export enum PriorityEnum {
  NonPriority = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Urgent = 4,
}

export interface PriorityDTO {
  value: PriorityEnum;
  label: string;
}

export function getPriorityLabelByValue(value: number): string {
  return Object.keys(PriorityEnum)[Object.values(PriorityEnum).indexOf(value)];
}
export const priorityOptions: PriorityDTO[] = [
  {
    label: 'Sem Prioridade',
    value: 0,
  },
  {
    label: 'Baixa',
    value: 1,
  },
  {
    label: 'Media',
    value: 2,
  },
  {
    label: 'Alta',
    value: 3,
  },
  {
    label: 'Urgente',
    value: 4,
  },
];
