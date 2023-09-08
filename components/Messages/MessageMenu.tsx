import axios from '@/app/api/axios'
import notify from '@/utils/notify'
import useToken from '@/hooks/useToken'
import { poppins } from '@/public/fonts/f'
import throwError from '@/utils/throwError'
import { useMessageStore } from '@/utils/store'
import { AxiosError, AxiosResponse } from 'axios'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, FC, useState, SetStateAction, Dispatch } from 'react'
import { MdOutlinePrivacyTip, RiDeleteBin7Line } from '@/public/icons/ico'

const MessageMenu: FC<{
    message: MessageStates,
    messages: MessageStates[],
    setMessages: Dispatch<SetStateAction<MessageStates[]>>
}> = ({ message, messages, setMessages }) => {
    const token = useToken()
    const { setTotalMessages } = useMessageStore()
    const [visible, setVisible] = useState<boolean>(message.private)

    const handleVisibility = async (msgId: string) => {
        await axios.get(`/api/msg/edit/${msgId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res: AxiosResponse) => {
            setVisible((prev) => !prev)
            notify('success', res.data?.msg)
        }).catch((err: AxiosError) => throwError(err))
    }

    const handleDelete = async (msgId: string) => {
        await axios.delete(`/api/msg/delete/${msgId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res: AxiosResponse) => {
            notify('success', res.data?.msg)
            const filteredMessages = messages.filter((msg) => msg.id !== msgId)
            setMessages(filteredMessages)
            setTotalMessages(filteredMessages.length)
        }).catch((err: AxiosError) => throwError(err))
    }

    return (
        <div >
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <ChevronDownIcon
                            className="h-4 w-4 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-clr-11 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={async () => await handleVisibility(message.id)}
                                        className={`${poppins.className} ${active ? 'bg-clr-1 rounded-md text-clr-0' : 'font-medium'} w-full items-center flex gap-3 px-2 py-1`}>
                                        {active ? (
                                            <MdOutlinePrivacyTip
                                                aria-hidden='true'
                                                className='text-clr-0'
                                            />
                                        ) : (
                                            <MdOutlinePrivacyTip
                                                aria-hidden='true'
                                                className='text-clr-1'
                                            />
                                        )}
                                        {visible === true ? 'Make Public' : 'Make Private'}
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={async () => await handleDelete(message.id)}
                                        className={`${poppins.className} ${active ? 'bg-clr-1 rounded-md text-clr-0' : 'font-medium'} w-full items-center flex gap-3 px-2 py-1`}>
                                        {active ? (
                                            <RiDeleteBin7Line
                                                aria-hidden='true'
                                                className='text-clr-0'
                                            />
                                        ) : (
                                            <RiDeleteBin7Line
                                                aria-hidden='true'
                                                className='text-clr-1'
                                            />
                                        )}
                                        Delete
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default MessageMenu
