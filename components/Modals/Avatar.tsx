import { FC } from 'react'
import Modal from '../Modal'
import useToken from '@/hooks/useToken'

const Avatar: FC<ModalComponent> = ({ get, set, data }) => {
    const token = useToken()

    const changeAvatar = async (): Promise<void> => {

    }

    const delAvatar = async (): Promise<void> => {

    }

    return (
        <Modal get={get} set={set} >
            <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
                <div className='profile-avatar md:w-[12rem] md:h-[12rem] mx-auto'>
                    {avatarPreview ?
                        <img src={avatarPreview} alt="avatar" /> :
                        <>
                            {profile?.avatar?.url ?
                                <Image src={profile?.avatar?.url}
                                    width={300} height={300} alt="avatar" loading='lazy' /> :
                                <Image src="https://res.cloudinary.com/kawojue/image/upload/v1685607626/TOOPCC/Staffs/avatar_ndluis.webp"
                                    width={300} height={300} alt="avatar" loading='lazy' />
                            }
                        </>
                    }
                </div>
                <input type="file" accept="image/*" id="avatar"
                    onChange={(e) => handleFile(e)} className="hidden" />
                <article className="profile-avatar-btn">
                    <label htmlFor='avatar' className="change-avatar">
                        <AiOutlineCloudUpload />
                        <span>Change photo</span>
                    </label>
                    <button type='button' className="del-avatar"
                        onClick={async () => await delAvatar()}>
                        <RiDeleteBin6Line />
                        <span>Remove photo</span>
                    </button>
                </article>
            </form>
            <div className="modal-btn-container">
                <button className="save-btn" disabled={!eligible}
                    type="submit" onClick={async () => await changeAvatar()}>
                    {loading ? <SpinnerOne /> : 'Save'}
                </button>
                <button className="cancel-btn"
                    onClick={() => cancel()}>
                    Cancel
                </button>
            </div>
        </Modal>
    )
}

export default Avatar