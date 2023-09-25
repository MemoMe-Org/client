"use client"
import { AxiosError } from 'axios'
import axios from '@/app/api/axios'
import { poppins } from '@/public/fonts/f'
import {
    CiShare1, BiTimer,
    MdOutlinePrivacyTip, RiDeleteBin7Line,
} from '@/public/icons/ico'
import throwError from '@/utils/throwError'
import { Fragment, FC, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useModalStore, usePoll } from '@/utils/store'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const PollMenu: FC<PollMenu> = ({ poll, polls, setPolls, isOwner }) => {
    const { setTotalPolls } = usePoll()
    const [active, setActive] = useState<boolean>(poll.active)
    const [visible, setVisible] = useState<boolean>(poll.private)
    const { setSharePollModal, setPollExpiryModal } = useModalStore()

    const handleEdit = async (type: 'active' | 'visiblity', pollId: string): Promise<void> => {
        const originalValue = type === 'active' ? active : visible
        const newValue = !originalValue

        switch (type) {
            case 'active':
                setActive(newValue)
                break
            case 'visiblity':
                setVisible(newValue)
                break
            default:
                break
        }

        await axios.patch(
            `/api/poll/edit/toggle/${pollId}/${type}`
        ).catch((err: AxiosError) => {
            switch (type) {
                case 'active':
                    setActive(originalValue)
                    break
                case 'visiblity':
                    setVisible(originalValue)
                    break
                default:
                    break
            }
            throwError(err)
        })
    }

    const handleDelete = async (pollId: string): Promise<void> => {
        const oldPolls = polls
        const oldTotalLength = polls.length
        const newPolls = polls.filter((poll) => poll.id !== pollId)

        setPolls(newPolls)
        setTotalPolls(newPolls.length)

        await axios.delete(
            `/api/poll/delete/${pollId}`
        ).catch((err: AxiosError) => {
            setPolls(oldPolls)
            setTotalPolls(oldTotalLength)
            throwError(err)
        })
    }

    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-clr-13 px-3 py-1.5 text-sm font-medium hover:bg-clr-5  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <ChevronDownIcon
                            className="h-4 w-4 text-clr-0 hover:text-clr-7"
                            aria-hidden='true'
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
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-clr-11 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {isOwner && <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={async () => await handleEdit('visiblity', poll.id)}
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
                                        {visible === true ? 'Private' : 'Public'} Poll
                                    </button>
                                )}
                            </Menu.Item>
                        </div>}
                        {isOwner && <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={async () => await handleDelete(poll.id)}
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
                        </div>}
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => setSharePollModal(true)}
                                        className={`${poppins.className} ${active ? 'bg-clr-1 rounded-md text-clr-0' : 'font-medium'} w-full items-center flex gap-3 px-2 py-1`}>
                                        {active ? (
                                            <CiShare1
                                                aria-hidden='true'
                                                className='text-clr-0'
                                            />
                                        ) : (
                                            <CiShare1
                                                aria-hidden='true'
                                                className='text-clr-1'
                                            />
                                        )}
                                        Share
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        {isOwner && <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => setPollExpiryModal(true)}
                                        className={`${poppins.className} ${active ? 'bg-clr-1 rounded-md text-clr-0' : 'font-medium'} w-full items-center flex gap-3 px-2 py-1`}>
                                        {active ? (
                                            <BiTimer
                                                aria-hidden='true'
                                                className='text-clr-0'
                                            />
                                        ) : (
                                            <BiTimer
                                                aria-hidden='true'
                                                className='text-clr-1'
                                            />
                                        )}
                                        Set Expiry
                                    </button>
                                )}
                            </Menu.Item>
                        </div>}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default PollMenu