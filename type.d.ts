type AuthMethod = 'google' | 'github'

type NotifyAction = 'error' | 'success'

interface PathName {
    pathName?: 'login' | 'signup' | string
}

interface AuthProps extends PathName {
    title: string
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

interface NavProps {
    data?: {
        username?: string
        avatar_url?: string
    }
    isAuthenticated: boolean
}

interface LevelProps {
    msgPoint: number
    pollPoint: number
}

type LevelType = 'message' | 'overall' | 'poll'

interface TempLevel {
    point: number
    total: number
    type: LevelType
}

interface ILevel {
    point: number
    level: string
    type: LevelType
}

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
    token: string | undefined
    resetStates: () => void
    setOtp: (otp: string) => void
    setAuth: (auth: boolean) => void
    setToken: (token: string) => void
    setEmail: (email: string) => void
    setUserId: (userId: string) => void
    setLoading: (loading: boolean) => void
    setPassword: (password: string) => void
    setPassword2: (password2: string) => void
}

interface Params {
    params: {
        username: string
    }
}

interface IProfile extends PathName {
    user: any,
}