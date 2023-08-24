import { create } from 'zustand'

const initialUserStore = {
    otp: '',
    email: '',
    userId: '',
    auth: false,
    password: '',
    password2: '',
    loading: false,
}

const UserStore = create<UserStoreStates>()((set) => ({
    token: undefined,
    ...initialUserStore,
    setOtp: (otp: string) => set({ otp }),
    resetStates: () => set(initialUserStore),
    setAuth: (auth: boolean) => set({ auth }),
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