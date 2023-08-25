import { FC, useEffect, useState } from 'react'
import { generativeApi } from '@/app/api/axios'


const Levels: FC<LevelProps> = ({ msgPoint, pollPoint }) => {
    const [data, setData] = useState<any[]>([])

    const handleLevel = async (level: LevelType, point: number) => {
        const { data } = await generativeApi.get(
            `/levels/${level}?point=${point}`
        )
        return data
    }

    useEffect(() => {
        const overallPoint = (msgPoint + pollPoint) / 2
        const tempData: {
            point: number
            level: LevelType
        }[] = [
                {
                    point: msgPoint,
                    level: 'message'
                },
                {
                    point: pollPoint,
                    level: 'poll'
                },
                {
                    point: overallPoint,
                    level: 'overall'
                },
            ]

        const dataPromises = tempData.map(async (temp) => {
            return await handleLevel(temp.level, temp.point)
        });

        (async () => await Promise.all(dataPromises))()

    }, [msgPoint, pollPoint])

    return (
        <></>
    )
}

export default Levels