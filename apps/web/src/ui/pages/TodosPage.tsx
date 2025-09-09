 
import { useTodos } from '../../app/hooks/useTodos'
 
export default function TodosPage() {
  const { todos, create, remove, isLoading, isError } = useTodos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-violet-200 to-purple-200 bg-clip-text text-transparent">
            Todos
          </h1>
          <p className="text-violet-200/80 text-sm">Organiza tus tareas con estilo</p>
        </div>

        <form
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl"
          onSubmit={(e) => {
            e.preventDefault()
            const input = e.currentTarget.elements.namedItem("title") as HTMLInputElement
            const v = input.value.trim()
            if (v) create(v)
            input.value = ""
          }}
        >
          <div className="flex gap-3">
            <input
              name="title"
              className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-violet-200/60 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all duration-300"
              placeholder="Nueva tarea..."
            />
            <button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-violet-500/25">
              Agregar
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="backdrop-blur-xl bg-violet-500/20 border border-violet-400/30 rounded-xl p-4">
            <p className="text-violet-200 text-sm flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-violet-300 border-t-transparent rounded-full animate-spin"></div>
              Cargando…
            </p>
          </div>
        )}

        {isError && (
          <div className="backdrop-blur-xl bg-red-500/20 border border-red-400/30 rounded-xl p-4">
            <p className="text-red-200 text-sm">Hubo un problema cargando los todos.</p>
          </div>
        )}

        <div className="space-y-3">
          {todos.map((t, index) => (
            <div
              key={t.id}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 shadow-lg hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl group"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.5s ease-out forwards",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-balance">{t.title}</span>
                <button
                  className="text-violet-300 hover:text-red-300 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-500/20 transition-all duration-300 opacity-70 group-hover:opacity-100"
                  onClick={() => remove(t.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {todos.length === 0 && !isLoading && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-violet-200/80 text-lg font-medium mb-2">¡Todo listo!</p>
            <p className="text-violet-300/60 text-sm">No tienes tareas pendientes</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
