import { FC, useEffect, useState } from 'react'
import { generativeApi } from '@/app/api/axios'


const Levels: FC<LevelProps> = ({ msgPoint, pollPoint }) => {
    const [data, setData] = useState<any>({})

    const overallPoint = (msgPoint + pollPoint) / 2
    const handleLevel = async (level: LevelType, point: number) => {
        const { data } = await generativeApi.get(
            `/levels/${level}?point=${point}`
        )

        setData(data)
    }

    useEffect(() => {
        (async () => await handleLevel('message', msgPoint))()
    }, [msgPoint])

    console.log(data)

    return (
        <></>
    )
}

export default Levels