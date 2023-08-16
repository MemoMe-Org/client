interface InputProps<T> {
    value: T
    type: string
    label: string
    onChange: (value: T) => void
}

interface UserStoreStates {
    email: string,
    password: string
    resetStates: () => void
    setEmail: (email: string) => void
    setPassword: (password: string) => void
} 