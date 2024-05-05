import { TaskProvider } from '@/contexts'
import { TaskList } from '@/components'
import { DefaultLayout } from '@/layouts'

function App() {
  return (
    <DefaultLayout>
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    </DefaultLayout>
  )
}

export default App
