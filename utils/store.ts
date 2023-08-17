import { create } from 'zustand'

const initialUserStore = {
    email: '',
    userId: '',
    password: ''
}

const UserStore = create<UserStoreStates>()((set) => ({
    token: '',
    ...initialUserStore,
    resetStates: () => set(initialUserStore),
    setToken: (token: string) => set({ token }),
    setEmail: (email: string) => set({ email }),
    setUserId: (userId: string) => set({ userId }),
    setPassword: (password: string) => set({ password }),
}))

const useTextEditor = create<TextEditorStates>()((set) => ({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    setIsBold: (isBold: boolean) => set({ isBold }),
    setIsItalic: (isItalic: boolean) => set({ isItalic }),
    setIsUnderline: (isUnderline: boolean) => set({ isUnderline }),
}))

export { UserStore, useTextEditor }