/* eslint-disable @next/next/no-img-element */
import Modal from '../Modal'
import blob from '@/utils/file'
import useToken from '@/hooks/useToken'
import { LoaderThree } from '../Loader'
import { ChangeEvent, FC, useState } from 'react'
import { UserStore, useModalStore } from '@/utils/store'
import { AiOutlineCloudUpload, RiDeleteBin6Line } from '@/public/icons/ico'

const Avatar: FC<ModalComponent> = ({ get, set, data }) => {
    const token = useToken()
    const { avatar, setAvatar } = UserStore()
    const { loading, setLoading } = useModalStore()
    const [avatarPreview, setAvatarPreview] = useState<string>('')

    const changeAvatar = async (): Promise<void> => {

    }

    const delAvatar = async (): Promise<void> => {

    }

    const cancel = () => {
        set(false)
        setAvatar(null)
        setAvatarPreview('')
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
        blob(e, setAvatarPreview)
        setAvatar(e.target.files![0])
    }

    return (
        <Modal get={get} set={set} >
            <form
                className='modal-form'
                onSubmit={(e) => e.preventDefault()}>
                <div className='profile-avatar md:w-[12rem] md:h-[12rem] mx-auto'>
                    {avatarPreview ?
                        <img src={avatarPreview} alt='avatar' /> :
                        <>
                            {data?.avatar?.url ?
                                <img src={data?.avatar?.url}
                                    width={300} height={300} alt='avatar' loading='lazy' /> :
                                <img src="https://res.cloudinary.com/kawojue/image/upload/v1685607626/TOOPCC/Staffs/avatar_ndluis.webp"
                                    width={300} height={300} alt='avatar' loading='lazy' />
                            }
                        </>
                    }
                </div>
                <input
                    type='file'
                    id='avatar'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => handleFile(e)}
                />
                <article className='profile-avatar-btn'>
                    <label
                        htmlFor='avatar'
                        className='change-avatar'>
                        <AiOutlineCloudUpload />
                        <span>Change photo</span>
                    </label>
                    <button
                        type='button'
                        className='del-avatar'
                        onClick={async () => await delAvatar()}>
                        <RiDeleteBin6Line />
                        <span>Remove photo</span>
                    </button>
                </article>
            </form>

            <div className="modal-btn-container">
                <button
                    className='save-btn' disabled={!Boolean(avatar)}
                    type='submit'
                    onClick={async () => await changeAvatar()}>
                    {loading ? <LoaderThree /> : 'Save'}
                </button>
                <button
                    className='cancel-btn'
                    onClick={() => cancel()}>
                    Cancel
                </button>
            </div>
        </Modal>
    )
}

export default Avatar