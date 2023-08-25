import { handleLevel } from '@/lib/level'
import { FC, useEffect, useState } from 'react'

const Levels: FC<LevelProps> = ({ msgPoint, pollPoint }) => {
    const [data, setData] = useState<ILevel[]>([])

    useEffect(() => {
        const overallPoint = parseInt(((msgPoint + pollPoint) / 3).toFixed(2))
        const tempData: TempLevel[] = [
            {
                total: 320,
                type: 'message',
                point: msgPoint,
            },
            {
                total: 320,
                type: 'poll',
                point: pollPoint,
            },
            {
                total: 400,
                type: 'overall',
                point: overallPoint,
            },
        ]

        const fetchData = async () => {
            const dataPromises = tempData.map(async (temp) => {
                const promisedData = await handleLevel(temp.type, temp.point)
                const data: ILevel = {
                    type: temp.type,
                    point: temp.point,
                    level: promisedData?.level
                }
                return data
            })
            const resolvedData = await Promise.all(dataPromises)
            setData(resolvedData)
        }

        (async () => await fetchData())()
    }, [msgPoint, pollPoint])

    return (
        <></>
    )
}

export default Levels