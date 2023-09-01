"use client"
import genMsg from '@/lib/genMsg'
import { FC, useEffect } from 'react'
import { poppins } from '@/public/fonts/f'
import { useTextEditor } from '@/utils/store'
import { FaUnderline, FaItalic, FaBold } from '@/public/icons/ico'

const TextEditor: FC<{
    textEditorRef: any,
    msgType: GenMsgType
}> = ({ textEditorRef, msgType }) => {
    const {
        isBold, setIsBold,
        isItalic, setIsItalic,
        isUnderline, setIsUnderline
    } = useTextEditor()

    const exec = (
        command: string,
        get: boolean,
        set: (get: boolean) => void
    ): void => {
        document.execCommand(command, false)
        set(!get)
    }

    const insertText = async (): Promise<void> => {
        const insertText = await genMsg(msgType)
        const contentEditable = textEditorRef.current
        if (contentEditable && insertText) {
            contentEditable.textContent = insertText
        }
    }

    useEffect(() => {
        const contentEditable = textEditorRef.current
        if (contentEditable) {
            contentEditable.textContent = 'Type your messages here...'
        }
    }, [textEditorRef])

    return (
        <section className='rounded-md border-[2px] mt-5'>
            <div className='border-b-[1px] py-2 flex gap-5 px-6 justify-between'>
                <div className='flex gap-3 items-center'>
                    <button
                        type='button'
                        title='Bold'
                        className={`${isBold && 'active'} editor-btn`}
                        onClick={() => exec('bold', isBold, setIsBold)}>
                        <FaBold />
                    </button>
                    <button
                        type='button'
                        title='Italic'
                        className={`${isItalic && 'active'} editor-btn`}
                        onClick={() => exec('italic', isItalic, setIsItalic)}>
                        <FaItalic />
                    </button>
                    <button
                        type='button'
                        title='Underline'
                        className={`${isUnderline && 'active'} editor-btn`}
                        onClick={() => exec('underline', isUnderline, setIsUnderline)}>
                        <FaUnderline />
                    </button>
                </div>
                <button
                    onClick={async () => await insertText()}
                    className={`${poppins.className} tracking-wider px-2 py-1 rounded-lg bg-clr-4 text-clr-12 hover:bg-clr-5 trans`}
                    style={{
                        boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px`
                    }}>
                    Suprise me
                </button>
            </div>
            <div
                spellCheck='true'
                ref={textEditorRef}
                contentEditable='true'
                className={`editor-box ${poppins.className}`}
            />
        </section>
    )
}

export default TextEditor