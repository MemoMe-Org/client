import notify from '@/utils/notify'

const isProd = process.env.NODE_ENV === 'production'

const handleSignIn = (type: AuthMethod) => {
    const authUrlWindow = window.open(`${isProd ? process.env.NEXT_PUBLIC_AUTH_URL : 'http://localhost:2002'}/auth/${type === 'github' ? 'github' : 'google'}`, "_blank")

    if (authUrlWindow) {
        authUrlWindow.addEventListener('beforeunload', () => {
            notify('success', 'Login successful.')
        })
    } else {
        notify('error', 'Failed to login.')
    }
}

export { handleSignIn }