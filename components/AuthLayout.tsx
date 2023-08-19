import { FC } from 'react'
import Link from 'next/link'
import { lato } from '@/public/fonts/f'
import { handleSignIn } from '@/lib/signin'
import { FcGoogle, AiOutlineGithub } from '@/public/icons/ico'

const AuthLayout: FC<AuthProps> = ({ children, handler, pathName }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()}
            className="card w-[95vw] max-w-[550px] mx-auto my-10 px-5 py-7 mt-14">
            <div className="text-xl tracking-wider font-semibold mb-5 md:text-2xl">
                {
                    <h2>
                        {pathName === 'login' ? 'Login' : 'Sign Up'}
                    </h2>
                }
            </div>
            <article>
                {children}
                <div className='flex justify-end mt-3'>
                    <button onClick={async () => await handler()}
                        className="rounded-full font-medium tracking-wider text-xl px-3 py-2 bg-clr-4 text-white hover:bg-clr-6 trans">
                        {
                            pathName === 'signup' ?
                                'Sign Up' : pathName === 'login' ?
                                    'Log In' : 'Submit'
                        }
                    </button>
                </div>
            </article>
            {
                (pathName === 'signup' || pathName === 'login') &&
                <>
                    <div className="flex items-center justify-center gap-3">
                        <span className="border-[1.5px] border-white w-full rounded-md" />
                        <span className="font-medium tracking-wide">Or</span>
                        <span className="border-[1.5px] border-white w-full rounded-md" />
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
                            <span className="mr-2">Already have an account?</span>
                            <Link href='/login' className="font-medium">Login</Link>
                        </p> :
                        <p>
                            <span className="mr-2">{`Don't have an account?`}</span>
                            <Link href='/signup' className="font-medium">Sign Up</Link>
                        </p>
                }
            </div>
        </form>
    )
}

export default AuthLayout