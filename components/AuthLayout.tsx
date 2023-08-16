import { FC } from 'react'
import Link from 'next/link'
import { lato } from '@/public/fonts/f'
import { usePathname } from 'next/navigation'
import { FcGoogle, AiOutlineGithub } from '@/public/icons/ico'

const AuthLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathName = usePathname()


    return (
        <form className="card w-[95vw] max-w-[550px] mx-auto my-10 px-5 py-10">
            {children}
            <div className="mt-3 flex justify-between">
                {
                    pathName === "/login" &&
                    <p>
                        <Link href='/password/verify'>Forgot Password?</Link>
                    </p>
                }
            </div>
            <div className="flex items-center justify-center gap-3 my-7">
                <span className="border-[1.5px] border-white w-full rounded-md" />
                <span className="font-medium tracking-wide">Or</span>
                <span className="border-[1.5px] border-white w-full rounded-md" />
            </div>
            <div className={`${lato.className} flex flex-col gap-5`}>
                <button className='provider-btn'>
                    <span>Google</span>
                    <FcGoogle className="text-2xl" />
                </button>
                <button className='provider-btn'>
                    <span>Github</span>
                    <AiOutlineGithub className="text-2xl" />
                </button>
            </div>
            <div>
                {
                    pathName === "/signup" ?
                        <p>
                            Already has an account?
                            <Link href='/login'>Login</Link>
                        </p> :
                        <p>
                            {`Don't have an account?`}
                            <Link href='/login'>Sign Up</Link>
                        </p>
                }
            </div>
        </form>
    )
}

export default AuthLayout