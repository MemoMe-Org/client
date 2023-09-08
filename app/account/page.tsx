"use client"
import MyPage from '@/components/MyPage'
import { UserStore } from '@/utils/store'

const page = () => {
    const { userId, setUserId } = UserStore()

    return (
        <MyPage param='account'>
            {({ data }) => {
                setUserId(data?.username)
                return (
                    <main className='profile'>
                        <article className="profile-header">
                            <h1 className='text-2xl text-clr-13 font-semibold tracking-wide md:text-3xl'>
                                Personal Account
                            </h1>
                        </article>
                        <section>
                            <article>
                                <div>
                                    <h3>Your username</h3>
                                    <p>This is your account username.</p>
                                    <div>
                                        <div>memome.one/</div>
                                        <input
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <footer>
                                    <p>Please use 32 characters at maximum.</p>
                                    <button>Save</button>
                                </footer>
                            </article>
                        </section>
                    </main >
                )
            }}
        </MyPage>
    )
}

export default page