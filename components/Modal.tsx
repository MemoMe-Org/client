import { FC, ReactNode } from 'react'

const Modal: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <dialog>
            {children}
        </dialog>
    )
}

export default Modal