import notify from '@/utils/notify'

const isProd = process.env.NODE_ENV === 'production'

const handleSignIn = (
    type: AuthMethod,
    method: 'home' | 'modal'
) => {
    const authUrlWindow = window.open(
    `${isProd ? process.env.NEXT_PUBLIC_AUTH_URL : 'http://localhost:2002'}/auth/${type === 'github' ? 'github' : 'google'}`,
    `${method === 'home' ? '_self': '_blank'}`
    )

    if (authUrlWindow) {
        authUrlWindow.addEventListener('beforeunload', () => {
            notify('success', 'Login successful.')
        })
    } else {
        notify('error', 'Failed to login.')
    }
}

export { handleSignIn }