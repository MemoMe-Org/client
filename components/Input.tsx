import { poppins } from '@/public/fonts/f'
import { FC } from 'react'

const Input: FC<InputProps<string>> = ({ value, type, label, onChange }) => {
    return (
        <div className="flex flex-col">
            <label className={`text-lg tracking-wider ${poppins.className}`}>
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="outline-none focus:border-[2px] focus:border-clr-2"
            />
        </div>
    )
}

export default Input