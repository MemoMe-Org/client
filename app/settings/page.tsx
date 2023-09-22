"use client"
import axios from '../api/axios'
import MyPage from '@/components/MyPage'
import { UserStore } from '@/utils/store'
import SwitchBtn from '@/components/Switch'
import throwError from '@/utils/throwError'
import { AxiosError, AxiosResponse } from 'axios'
import { inter, poppins } from '@/public/fonts/f'

const page = () => {
    const {
        setShowLevels, allowTexts, showLevels,
        allowFiles, setAllowTexts, setAllowFiles,
    } = UserStore()

    // edit bio
    // edit gen msg type

    const toggler = async (type: string): Promise<void> => {
        const originalValue = type === 'levels' ? showLevels : type === 'texts' ? allowTexts : allowFiles
        const newValue = !originalValue

        switch (type) {
            case 'levels':
                setShowLevels(newValue)
                break
            case 'texts':
                setAllowTexts(newValue)
                break
            case 'files':
                setAllowFiles(newValue)
                break
            default:
                break
        }

        await axios.get(
            `/auth/api/settings/toggle/${type}`,
        ).catch((err: AxiosError) => {
            switch (type) {
                case 'levels':
                    setShowLevels(originalValue)
                    break
                case 'texts':
                    setAllowTexts(originalValue)
                    break
                case 'files':
                    setAllowFiles(originalValue)
                    break
                default:
                    break
            }
            throwError(err)
        })
    }

    return (
        <MyPage param='settings'>
            {({ data }) => (
                <main className='profile'>
                    <article className="profile-header">
                        <h1 className='text-2xl text-clr-13 font-semibold tracking-wide md:text-3xl'>
                            Settings
                        </h1>
                    </article>
                    <section className={`${poppins.className} flex flex-col gap-10 text-clr-13 mb-10`}>
                        <article className='rounded-lg border-[0.75px]  overflow-hidden'>
                            <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                    Toggle Levels
                                </h3>
                                <SwitchBtn
                                    get={showLevels}
                                    set={setShowLevels}
                                    handler={async () => await toggler('levels')}
                                />
                            </div>
                            <footer className='profile-footer'>
                                <p className='text-clr-17 text-xs md:text-sm'>
                                    {showLevels ? 'Hide your Profile Levels.' : 'Show your Profile Levels'}
                                </p>
                            </footer>
                        </article>

                        <article className='rounded-lg border-[0.75px]  overflow-hidden'>
                            <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                    Toggle Texts
                                </h3>
                                <SwitchBtn
                                    get={allowTexts}
                                    set={setAllowTexts}
                                    handler={async () => await toggler('texts')}
                                />
                            </div>
                            <footer className='profile-footer'>
                                <p className='text-clr-17 text-xs md:text-sm'>
                                    {allowTexts ? 'Deny Anonymous Text Messages.' : 'Allow Anonymous Text Messages.'}
                                </p>
                            </footer>
                        </article>

                        <article className='rounded-lg border-[0.75px]  overflow-hidden'>
                            <div className='flex flex-col gap-3.5 pt-8 px-6 pb-5'>
                                <h3 className={`${inter.className} text-clr-16 font-medium tracking-wide text-[20px]`}>
                                    Toggle Media
                                </h3>
                                <SwitchBtn
                                    get={allowFiles}
                                    set={setAllowFiles}
                                    handler={async () => await toggler('files')}
                                />
                            </div>
                            <footer className='profile-footer'>
                                <p className='text-clr-17 text-xs md:text-sm'>
                                    {allowFiles ? 'Deny Anonymous Medias.' : 'Allow Anonymous Medias.'}
                                </p>
                            </footer>
                        </article>
                    </section>
                </main>
            )}
        </MyPage>
    )
}

export default page