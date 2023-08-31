import { FC } from 'react'
import Link from 'next/link'
import { LoaderThree } from './Loader'
import { UserStore } from '@/utils/store'
import { handleSignIn } from '@/lib/signin'
import { lato, poppins } from '@/public/fonts/f'
import { FcGoogle, AiOutlineGithub } from '@/public/icons/ico'

const AuthLayout: FC<AuthProps> = ({
    children, handler,
    pathName, title, btnLabel
}) => {
    const { loading } = UserStore()

    return (
        <form onSubmit={(e) => e.preventDefault()}
            className="card w-[92vw] max-w-[500px] mx-auto mt-3 px-5 py-7">
            <h2
                className={`${poppins.className} text-2xl tracking-wider font-medium mb-7 md:text-3xl text-clr-4`}>
                {title}
            </h2>
            <article>
                {children}
                <div className='flex justify-end mt-3'>
                    <button onClick={async () => await handler()}
                        className="submit-btn">
                        {loading ? <LoaderThree /> :
                            <>
                                {
                                    btnLabel || 'Submit'
                                }
                            </>
                        }
                    </button>
                </div>
            </article>
            {
                (pathName === 'signup' || pathName === 'login') &&
                <>
                    <div className="flex items-center justify-center gap-3">
                        <span className="border-[1.5px] border-clr-x w-full rounded-md" />
                        <span className="font-medium tracking-wide">Or</span>
                        <span className="border-[1.5px] border-clr-x w-full rounded-md" />
                    </div>
                    <div className={`${lato.className} flex flex-col gap-4 my-3`}>
                        <button
                            className='provider-btn'
                            onClick={() => handleSignIn('google')}>
                            <FcGoogle className="text-2xl" />
                            <span>Google</span>
                        </button>
                        <button
                            className='provider-btn'
                            onClick={() => handleSignIn('github')}>
                            <AiOutlineGithub className="text-2xl" />
                            <span>Github</span>
                        </button>
                    </div>
                </>
            }
            <div className="flex justify-end mt-2 text-[15px]">
                {
                    pathName === 'signup' ?
                        <p>
                            <span className="mr-2 text-clr-4">Already have an account?</span>
                            <Link href='/login' className="text-clr-1 hover:text-clr-8 trans font-medium">Login</Link>
                        </p> :
                        <p>
                            <span className="mr-2 text-clr-4">{`Don't have an account?`}</span>
                            <Link href='/signup' className="text-clr-1 hover:text-clr-8 trans font-medium">Sign Up</Link>
                        </p>
                }
            </div>
        </form>
    )
}

export default AuthLayout