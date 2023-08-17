const isProd = process.env.NODE_ENV === "production"

const handleSignIn = (type: AuthMethod) => {
    window.open(`${isProd ? process.env.NEXT_PUBLIC_AUTH_URL : 'http://localhost:2002'}/auth/${type === 'github' ? 'github' : 'google'}`, "_self")
}

export { handleSignIn }