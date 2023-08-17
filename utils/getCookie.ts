export default function getCookie(cookie: string) {
    return document.cookie
        .split('; ')
        .find((row: any) => row.startsWith(`${cookie}=`))
        ?.split('=')[1] || ''
}