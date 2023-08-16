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

const useTextEditor = create<TextEditorStates>()((set) => ({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    setIsBold: (isBold: boolean) => set({ isBold }),
    setIsItalic: (isItalic: boolean) => set({ isItalic }),
    setIsUnderline: (isUnderline: boolean) => set({ isUnderline }),
}))

export { UserStore, useTextEditor }