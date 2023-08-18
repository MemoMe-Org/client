import { create } from 'zustand'

const initialUserStore = {
    email: '',
    userId: '',
    password: '',
    password2: '',
    loading: false,
}

const UserStore = create<UserStoreStates>()((set) => ({
    token: '',
    ...initialUserStore,
    resetStates: () => set(initialUserStore),
    setToken: (token: string) => set({ token }),
    setEmail: (email: string) => set({ email }),
    setUserId: (userId: string) => set({ userId }),
    setLoading: (loading: boolean) => set({ loading }),
    setPassword: (password: string) => set({ password }),
    setPassword2: (password2: string) => set({ password2 }),
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