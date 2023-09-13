import { FC } from 'react'

const Input: FC<InputProps<string>> = ({
    value, label, type,
    onChange, placeholder
}) => {
    return (
        <div className='flex items-center'>
            <div className='bg-clr-14 px-2 py-1 rounded-l-md text-[14px] border-y-[0.5px] boder-x-[0.5px]'>
                {label}
            </div>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className='text-clr-16 rounded-r-md pl-0.5 py-0.5 text-[15px] outline-none border-y-[0.5px] border-x-[0.5px] focus:border-clr-15'
            />
        </div>
    )
}

export default Input