// Componente = função que devolve um pedaço de interface (JSX).
// O nome começa com maiúscula para o React saber que é um componente.
function App() {
  return (
    // className recebe as classes do Tailwind:
    // min-h-screen = altura mínima da tela | grid place-items-center = centraliza
    // bg-zinc-900 = fundo escuro | text-white = texto branco
    <main className="min-h-screen grid place-items-center bg-zinc-900 text-white">
      {/* text-3xl = fonte grande | font-bold = negrito */}
      <h1 className="text-3xl font-bold">Decupador</h1>
    </main>
  )
}

// export default permite que outros arquivos (main.tsx) importem o App
export default App
