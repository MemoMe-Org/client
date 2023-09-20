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
    disabled: boolean
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
    setDisabled: (disabled: boolean) => void
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
    files: MsgFile[]
}

interface MsgFile {
    idx: string
    url: string
    path: string
    type: FileType
}

type FileType = 'video/mp4' | 'image/png' | 'image/jpeg'

interface ModalStates {
    loading: boolean
    pollModal: boolean,
    avatarModal: boolean
    shareLinkModal: boolean
    createPollModal: boolean
    setLoading: (loading: boolean) => void
    setPollModal: (pollModal: boolean) => void
    setAvatarModal: (avatarModal: boolean) => void
    setShareLinkModal: (shareLinkModal: boolean) => void
    setCreatePollModal: (createPollModal: boolean) => void
}

interface MediaUploadProps extends State<File[] | null> {
    id: string
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
    data?: T,
    title?: string
}

interface SwitchProps extends State<boolean> {
    handler: () => Promise<void>
}

type MyPageType = 'settings' | 'profile' | 'account'

interface MyPage {
    param: MyPageType
    children: (props: { data: any }) => ReactNode
}

interface PollOption {
    id: string
    option: string
    totalVotes?: number
}

interface Poll {
    title: string
    pollUrl: string
    hosting: boolean
    fetching: boolean
    pollLoad: boolean
    totalPolls: number
    medias: File[] | null
    expiry: null | string
    options: PollOption[]
    poll: MyPoll | undefined
    isAuthenticated: boolean
    setPollToDefault: () => void
    setTitle: (title: string) => void
    setPollUrl: (pollUrl: string) => void
    setHosting: (hosting: boolean) => void
    setOptions: (poll: PollOption[]) => void
    setFetching: (fetching: boolean) => void
    setPollLoad: (pollLoad: boolean) => void
    setMedias: (medias: File[] | null) => void
    setExpiry: (expiry: null | string) => void
    setPoll: (poll: MyPoll | undefined) => void
    setTotalPolls: (totalPolls: number) => void
    setIsAuthenticated: (isAuthenticated: boolean) => void
}

interface MyPoll {
    active: boolean
    createdById: string
    date: string
    expiry: string | null
    files: MsgFile[]
    hasVoted: boolean
    id: string
    options: MyPollOption[]
    private: boolean
    title: string
    totalVotes: number
    views: number
    votedOption: string
    votes?: {
        id: string
        userId: string,
        optionId: string
    }[]
}

interface MyPollOption {
    id: string
    texts: string
    totalVotes: number
}

interface PollParams {
    params: {
        createdById: string,
        pollId: string
    }
}