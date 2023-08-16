import { create } from 'zustand'

const initialUserStore = {
    email: '',
    password: ''
}

const UserStore = create<UserStoreStates>()((set) => ({
    ...initialUserStore,
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password }),
    resetStates: () => set(initialUserStore)
}))

export { UserStore }