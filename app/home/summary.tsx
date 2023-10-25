import { monst } from '@/public/fonts/f';
import summary from '@/public/images/summary.png';
import { H3, P } from '@/utils/typography';
import Image from 'next/image';

export default function Summary() {
  return (
    <section className={`${monst.className} pt-[104px] bg-[#FAFAFA]`}>
      <div className='flex flex-row gap-[46px] items-center justify-center'>
        <figure>
          <Image
            src={summary}
            alt='summary_alt'
            draggable={false}
            className='object-cover'
          />
        </figure>
        <div className='flex flex-col gap-4'>
          <H3 className='!text-[30px] leading-[44px] font-semibold'>summary</H3>

          <P className='text-[#000000] !text-[20px] leading-[44px] max-w-[541px]'>
            MemoMe offers a user-friendly interface combined with robust
            features. Whether you're here to host polls, utilize our message
            generator, or explore the array of communication options, MemoMe is
            your ideal choice.
          </P>
        </div>
      </div>
    </section>
  );
}
