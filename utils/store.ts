import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

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
    setOtp: (otp) => set({ otp }),
    setAuth: (auth) => set({ auth }),
    setToken: (token) => set({ token }),
    setEmail: (email) => set({ email }),
    setUserId: (userId) => set({ userId }),
    setAvatar: (avatar) => set({ avatar }),
    resetStates: () => set(initialUserStore),
    setLoading: (loading) => set({ loading }),
    setPassword: (password) => set({ password }),
    setDisabled: (disabled) => set({ disabled }),
    setPassword2: (password2) => set({ password2 }),
}))

const useTextEditor = create<TextEditorStates>()((set) => ({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    setIsBold: (isBold) => set({ isBold }),
    setIsItalic: (isItalic) => set({ isItalic }),
    setIsUnderline: (isUnderline) => set({ isUnderline }),
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
    setSent: (sent) => set({ sent }),
    setMedias: (medias) => set({ medias }),
    setLoading: (loading) => set({ loading }),
    resetStates: () => set(initialMessageStore),
    setFetching: (fetching) => set({ fetching }),
    setProgress: (progress) => set({ progress }),
    setTotalMessages: (totalMessages) => set({ totalMessages }),
}))

const useModalStore = create<ModalStates>()((set) => ({
    loading: false,
    pollModal: false,
    avatarModal: false,
    shareLinkModal: false,
    createPollModal: false,
    setLoading: (loading) => set({ loading }),
    setPollModal: (pollModal) => set({ pollModal }),
    setAvatarModal: (avatarModal) => set({ avatarModal }),
    setShareLinkModal: (shareLinkModal) => set({ shareLinkModal }),
    setCreatePollModal: (createPollModal) => set({ createPollModal }),
}))


const pollInitialState = {
    title: '',
    medias: null,
    options: [
        { id: uuid(), option: '' },
        { id: uuid(), option: '' },
    ],
}

const usePoll = create<Poll>()((set) => ({
    title: '',
    pollUrl: '',
    medias: null,
    expiry: null,
    hosting: false,
    fetching: false,
    poll: undefined,
    pollLoad: false,
    totalPolls: 0,
    isAuthenticated: false,
    options: [
        { id: uuid(), option: '' },
        { id: uuid(), option: '' },
    ],
    setPoll: (poll) => set({ poll }),
    setTitle: (title) => set({ title }),
    setMedias: (medias) => set({ medias }),
    setExpiry: (expiry) => set({ expiry }),
    setPollUrl: (pollUrl) => set({ pollUrl }),
    setHosting: (hosting) => set({ hosting }),
    setOptions: (options) => set({ options }),
    setPollLoad: (pollLoad) => set({ pollLoad }),
    setFetching: (fetching) => set({ fetching }),
    setPollToDefault: () => set(pollInitialState),
    setTotalPolls: (totalPolls) => set({ totalPolls }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated })
}))

export {
    UserStore, useTextEditor, useModalStore,
    useMessageStore, usePoll,
}