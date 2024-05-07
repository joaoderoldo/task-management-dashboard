import { TaskList } from '@/components'
import { DefaultLayout } from '@/layouts'
import { useTasksStore } from '@/stores'

function App() {
  const tasks = useTasksStore(state => state.tasks)

  return (
    <DefaultLayout>
      <TaskList tasks={tasks} />
    </DefaultLayout>
  )
}

export default App
