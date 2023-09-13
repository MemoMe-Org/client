import { FC } from 'react'

const Input: FC<InputProps<string>> = ({
    value, label, type,
    onChange, placeholder
}) => {
    return (
        <div className='flex items-center'>
            <div className='bg-clr-14 rounded-l-md text-[12px] md:text-[14px] border-y-[0.5px] boder-x-[0.5px] px-2 py-1 tracking-wide'>
                {label}
            </div>
            <input
                type={type}
                value={value}
                maxLength={32}
                autoComplete='off'
                spellCheck='false'
                autoCorrect='false'
                autoCapitalize='false'
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className='text-clr-16 rounded-r-md text-[15px] outline-none border-y-[0.5px] border-x-[0.5px] focus:border-clr-15 px-1 py-0.5'
            />
        </div>
    )
}

export default Input