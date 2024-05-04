export interface TableColumn {
  header: string;
  field: string;
}

export const todoHeader: TableColumn[] = [
  {
    field: 'finishedAt',
    header: 'Status',
  },
  {
    field: 'description',
    header: 'Tarefa',
  },
  {
    field: 'priority',
    header: 'Prioridade',
  },
  {
    field: 'createdAt',
    header: 'Criação',
  },
  {
    field: 'id',
    header: 'Açoes',
  },
];
