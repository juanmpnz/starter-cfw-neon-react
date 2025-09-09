import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TodoHttpRepository } from '../../adapters/http/TodoHttpRepository'

const repo = new TodoHttpRepository()

export default function TodosPage() {
  const qc = useQueryClient()
  const { data } = useQuery({ queryKey: ['todos'], queryFn: () => repo.list() })
  const add = useMutation({ mutationFn: (t: string) => repo.create(t), onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }) })
  const del = useMutation({ mutationFn: (id: number) => repo.remove(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }) })

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Todos</h1>
      <form
        className="flex gap-2"
        onSubmit={e => {
          e.preventDefault()
          const input = e.currentTarget.elements.namedItem('title') as HTMLInputElement
          const v = input.value.trim()
          if (v) add.mutate(v)
          input.value = ''
        }}
      >
        <input name="title" className="border rounded px-3 py-2 flex-1" placeholder="Nueva tarea..." />
        <button className="bg-black text-white px-4 rounded">Agregar</button>
      </form>
      <ul className="space-y-2">
        {data?.map(t => (
          <li key={t.id} className="flex items-center justify-between border rounded px-3 py-2 bg-white">
            <span>{t.title}</span>
            <button className="text-sm underline" onClick={() => del.mutate(t.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
