import { saveAs } from 'file-saver'

const download = (url: string): void => {
    const fileName = url.split('.').pop()
    saveAs(url, `memome_${fileName}.mp4`)
}

export default download