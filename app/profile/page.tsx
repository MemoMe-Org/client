/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import NavBar from '@/components/Nav'

const page = () => {
    return (
        <main>
            <NavBar isAuthenticated={true} data={{ username: 'kawojue' }} />
        </main>
    )
}

export default page