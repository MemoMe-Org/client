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
                    total: temp.total,
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
        <section>
            {data?.map((level: ILevel, index) => {
                const innerWidth = (level.point / level.total) * 100

                return (
                    <article key={index} className='flex flex-col gap-2 mt-5 w-full'>
                        <div className='flex gap-2 items-center w-full'>
                            <span>
                                {level.type}
                            </span>
                            :
                            <div className=' w-full h-8 md:h-5 bg-clr-3 rounded-full overflow-hidden flex items-center justify-between'>
                                <span className='absolute text-xs w-full'>{level.level}</span>
                                <span className='absolute text-xs w-full'>{level.point}</span>
                                <div style={{
                                    width: `${innerWidth}%`
                                }} className='bg-clr-10 h-full rounded-full'>
                                </div>
                            </div>
                        </div>
                    </article>
                )
            })}
        </section>
    )
}

export default Levels