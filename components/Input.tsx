import { FC } from 'react'
import Link from 'next/link'
import { poppins } from '@/public/fonts/f'
import { usePathname } from 'next/navigation'

const Input: FC<InputProps<string>> = ({
    value, label,
    type, onChange
}) => {
    const pathName = usePathname()

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <label className={`tracking-widest font-medium ${poppins.className}`}>
                    {label}
                </label>
                {pathName === "/login" && type === "password" &&
                    <p className="flex justify-between">
                        <Link href='/password/verify'>Forgot Password?</Link>
                    </p>}
            </div>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="outline-none rounded-full py-1 px-1 text-lg border-[1px] border-clr-8 focus:border-[2px] focus:border-clr-1 trans"
            />
        </div>
    )
}

export default Input