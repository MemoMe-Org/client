"use client"
import MyPage from '@/components/MyPage'

const page = () => {

    // edit bio
    // show files, allow texts, allow files
    // edit gen msg type

    return (
        <MyPage param='settings'>
            {({ data }) => (
                <main className='profile'>
                    <article className="profile-header">
                        <h1 className='text-2xl text-clr-13 font-semibold tracking-wide md:text-3xl'>
                            Profile Settings
                        </h1>
                    </article>
                    <section>

                    </section>
                </main>
            )}
        </MyPage>
    )
}

export default page