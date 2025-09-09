export const keys = {
    todos: {
      list: () => ['todos'] as const,
      byId: (id: number) => ['todos', id] as const,
    },
  }
  