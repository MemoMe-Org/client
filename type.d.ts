type AuthMethod = 'google' | 'github'

type NotifyAction = 'error' | 'success'

interface PathName {
    pathName?: 'login' | 'signup' | 'main' | 'user'
}

interface AuthProps extends PathName {
    title: string
    btnLabel?: string
    children: ReactNode
    handler: () => Promise<void>
}

interface InputProps<T> {
    value: T
    type: string
    label: string
    placeholder?: string
    onChange: (value: T) => void
}

interface NavProps extends PathName {
    data?: {
        username?: string
        avatar_url?: string
    }
    isAuthenticated: boolean
}

interface TabProps {
    username: string
}

interface LevelProps {
    msgPoint: number
    pollPoint: number
}

type LevelType = 'message' | 'poll'

type TempLevel = {
    point: number
    total: number
    type: LevelType
}

type ILevel = {
    level: string
} & TempLevel

type GenMsgType = 'normal' | 'all' | 'relationship' | 'nasty'

interface TextEditorStates {
    isBold: boolean
    isItalic: boolean
    isUnderline: boolean
    setIsBold: (isBold: boolean) => void
    setIsItalic: (isItalic: boolean) => void
    setIsUnderline: (isUnderline: boolean) => void
}

interface UserStoreStates {
    otp: string
    auth: boolean
    email: string
    userId: string
    loading: boolean
    password: string
    password2: string
    avatar: File | null
    token: string | undefined
    resetStates: () => void
    setOtp: (otp: string) => void
    setAuth: (auth: boolean) => void
    setToken: (token: string) => void
    setEmail: (email: string) => void
    setUserId: (userId: string) => void
    setLoading: (loading: boolean) => void
    setPassword: (password: string) => void
    setAvatar: (avatar: File | null) => void
    setPassword2: (password2: string) => void
}

interface MessageStoreStates {
    sent: boolean
    loading: boolean
    progress: number
    fetching: boolean
    totalMessages: number
    medias: File[] | null
    resetStates: () => void
    setSent: (sent: boolean) => void
    setLoading: (loading: boolean) => void
    setProgress: (progress: number) => void
    setFetching: (fetching: boolean) => void
    setMedias: (medias: File[] | null) => void
    setTotalMessages: (totalMessages: number) => void
}

interface MessageStates {
    id: string
    date: string
    texts?: string | TrustedHTML
    private: boolean
    files: [{
        idx?: string
        url?: string
        path?: string
        type?: string
    }]
}

interface ModalStates {
    loading: boolean
    avatarModal: boolean
    shareLinkModal: boolean
    createPollModal: boolean
    setLoading: (loading: boolean) => void
    setAvatarModal: (avatarModal: boolean) => void
    setShareLinkModal: (shareLinkModal: boolean) => void
    setCreatePollModal: (createPollModal: boolean) => void
}

interface Params {
    params: {
        username: string
    }
}

interface IProfile extends PathName {
    user: any
    username?: string
}

interface State<T> {
    get: T
    set: (get: T) => void
}

interface ModalProps extends State<boolean> {
    children: ReactNode
}

interface ModalComponent extends State<boolean> {
    data?: T
}