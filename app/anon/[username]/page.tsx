/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useQuery } from '@tanstack/react-query'

const page = ({ params: { username } }: Params) => {
    console.log(username)
    return (
        <></>
    )
}

export default page