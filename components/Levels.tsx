import { handleLevel } from '@/lib/level'
import { FC, useEffect, useState } from 'react'

const Levels: FC<LevelProps> = ({ msgPoint, pollPoint }) => {
    const [data, setData] = useState<ILevel[]>([])

    useEffect(() => {
        const tempData: TempLevel[] = [
            {
                total: 800,
                type: 'message',
                point: msgPoint,
            },
            {
                total: 2225,
                type: 'poll',
                point: pollPoint,
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

    console.log(data)

    return (
        <></>
    )
}

export default Levels