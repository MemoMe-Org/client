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
    disabled: false,
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
    setDisabled: (disabled: boolean) => set({ disabled }),
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
    progress: 0,
    sent: false,
    medias: null,
    loading: false,
    fetching: false,
    totalMessages: 0,
}

const useMessageStore = create<MessageStoreStates>()((set) => ({
    ...initialMessageStore,
    setSent: (sent: boolean) => set({ sent }),
    resetStates: () => set(initialMessageStore),
    setLoading: (loading: boolean) => set({ loading }),
    setFetching: (fetching: boolean) => set({ fetching }),
    setProgress: (progress: number) => set({ progress }),
    setMedias: (medias: null | File[]) => set({ medias }),
    setTotalMessages: (totalMessages: number) => set({ totalMessages }),
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