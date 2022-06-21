import create from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminState {
  admins: string[]
  addAdmin: (memberId: string) => void
  removeAdmin: (memberId: string) => void
}

export const useStore = create<AdminState>()(
  persist(
    (set) => ({
      admins: [],
      addAdmin: (memberId) =>
        set((state) => ({ admins: [...state.admins, memberId] })),
      removeAdmin: (memberId) =>
        set((state) => ({
          admins: state.admins.filter((admin) => admin !== memberId),
        })),
    }),
    {
      name: 'admin-storage',
    }
  )
)
