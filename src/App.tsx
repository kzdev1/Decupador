import { SceneForm } from './components/SceneForm/SceneForm'

function App() {
  return (
    <main className="min-h-screen bg-zinc-900 p-4 text-white">
      <SceneForm onSubmit={(values) => console.log(values)} />
    </main>
  )
}

export default App