import { ReactComponent as Logo } from '@/assets/img/logo.svg'

import { DefaultLayoutProps } from '@/layouts/Default/types'

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <main className="flex min-h-screen">
      <aside className="min-h-full w-64 shrink-0 border-r border-r-secondary bg-white p-8">
        <Logo className="h-10" />
        <span className="mt-4 block text-center text-sm">
          Manage your daily tasks.
        </span>
        <hr className="-mx-8 mt-8 border-secondary" />
      </aside>
      <div className="min-h-screen w-full">{children}</div>
    </main>
  )
}

export { DefaultLayout }
