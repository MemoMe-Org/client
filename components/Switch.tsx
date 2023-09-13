import { FC } from 'react'
import { Switch } from '@headlessui/react'

const SwitchBtn: FC<State<boolean>> = ({ get, set }) => {
    return (
        <Switch
            checked={get}
            onChange={set}
            className={`${get ? 'bg-clr-9' : 'bg-clr-3'}
            relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
            <span
                aria-hidden="true"
                className={`${get ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    )
}

export default SwitchBtn
