import { create } from 'zustand'

const initialUserStore = {
    otp: '',
    email: '',
    userId: '',
    auth: false,
    avatar: null,
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
    setAvatar: (avatar: File | null) => set({ avatar }),
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

const initialMessageStore = {
    page: 1,
    progress: 0,
    sent: false,
    medias: null,
    messages: [],
    loading: false,
}

const useMessageStore = create<MessageStoreStates>()((set) => ({
    ...initialMessageStore,
    setPage: (page: number) => set({ page }),
    setSent: (sent: boolean) => set({ sent }),
    resetStates: () => set(initialMessageStore),
    setLoading: (loading: boolean) => set({ loading }),
    setMessages: (messages: any[]) => set({ messages }),
    setProgress: (progress: number) => set({ progress }),
    setMedias: (medias: null | File[]) => set({ medias }),
}))

const useModalStore = create<ModalStates>()((set) => ({
    loading: false,
    avatarModal: false,
    shareLinkModal: false,
    createPollModal: false,
    setLoading: (loading: boolean) => set({ loading }),
    setAvatarModal: (avatarModal: boolean) => set({ avatarModal }),
    setShareLinkModal: (shareLinkModal: boolean) => set({ shareLinkModal }),
    setCreatePollModal: (createPollModal: boolean) => set({ createPollModal }),
}))

export { UserStore, useTextEditor, useMessageStore, useModalStore }