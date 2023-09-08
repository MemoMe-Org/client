"use client"
import MyPage from '@/components/MyPage'

const page = () => {
    return (
        <MyPage param='account'>
            {({ data }) => (
                <section>

                </section>
            )}
        </MyPage>
    )
}

export default page