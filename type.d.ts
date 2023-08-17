type AuthMethod = 'google' | 'github'

interface AuthProps {
    children: ReactNode,
    handler: () => Promise<void>
}

interface InputProps<T> {
    value: T
    type: string
    label: string
    placeholder?: string
    onChange: (value: T) => void
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
    email: string
    userId: string
    password: string
    resetStates: () => void
    setEmail: (email: string) => void
    setUserId: (userId: string) => void
    setPassword: (password: string) => void
} 