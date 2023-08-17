export default function getCookie(authHeader: string, cookie: string) {
    return authHeader
        .split('; ')
        .find((row: any) => row.startsWith(`${cookie}=`))
        ?.split('=')[1]
}