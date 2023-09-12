"use client"
import MyPage from '@/components/MyPage'
import { inter, poppins, questrial } from '@/public/fonts/f'
import { UserStore } from '@/utils/store'

const page = () => {
    const { userId, setUserId } = UserStore()

    return (
        <MyPage param='account'>
            {({ data }) => {
                return (
                    <main className='profile'>
                        <article className="profile-header">
                            <h1 className='text-2xl text-clr-13 font-semibold tracking-wide md:text-3xl'>
                                Personal Account
                            </h1>
                        </article>
                        <section
                            className={`${poppins.className} flex flex-col gap-10 text-clr-13 `}>
                            <article className='rounded-lg border-[1px] border-clr-5 overflow-hidden'>
                                <div className='pt-8 px-6 pb-5'>
                                    <h3 className={`${inter.className} text-clr-4 font-medium text-xl`}>
                                        Your username
                                    </h3>
                                    <p>This is your account username.</p>
                                    <div className='flex items-center'>
                                        <div className='bg-clr-14 px-2 py-1 rounded-l-md text-[14px]'>
                                            memome.one/
                                        </div>
                                        <input
                                            value={userId}
                                            placeholder={data?.username}
                                            onChange={(e) => setUserId(e.target.value)}
                                            className='rrounded-r-md px-2 py-1text-[14px]'
                                        />
                                    </div>
                                </div>
                                <footer className='px-7 py-2 flex justify-between items-center bg-clr-14 w-full '>
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