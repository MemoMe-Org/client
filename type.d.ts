type AuthMethod = 'google' | 'github'

type NotifyAction = 'error' | 'success'

interface PathName {
    pathName?: 'login' | 'signup'
}

interface AuthProps extends PathName {
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
        avatar_url?: string,
    }
    isAuthenticated: boolean
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
    auth: boolean
    token: string
    email: string
    userId: string
    loading: boolean
    password: string
    password2: string
    resetStates: () => void
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