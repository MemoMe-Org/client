import {
    Inter, Poppins,
    Questrial, Lato,
    PT_Sans, Kaushan_Script
} from 'next/font/google'

const questrial = Questrial({
    weight: '400',
    subsets: ['latin']
})

const inter = Inter({
    weight: '400',
    subsets: ['latin']
})

const lato = Lato({
    weight: '400',
    subsets: ['latin']
})

const poppins = Poppins({
    weight: ['400', '700'],
    subsets: ['latin']
})

const ptSans = PT_Sans({
    weight: ['400', '700'],
    subsets: ['latin']
})

const kaushan = Kaushan_Script({
    weight: '400',
    subsets: ['latin']
})


export {
    inter, poppins,
    lato, questrial,
    ptSans, kaushan,
}