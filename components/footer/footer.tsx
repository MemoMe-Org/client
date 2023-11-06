import { monst } from '@/public/fonts/f';
import { Text, P } from '@/utils/typography';

export default function Footer() {
  return (
    <>
      <footer
        className={` ${monst.className} flex flex-row justify-center my-[50px] lg:px-[31px] lg:my-[100px]`}
      >
        <div className='flex flex-col items-center'>
          <Text className='text-[#4F4F4F] !text-base md:!text-lg leading-[33px]'>
             Copyright <span>&copy;</span>&nbsp;
            <span>{new Date().getFullYear()} </span>{' '}
            <span className='font-semibold'>MemoMe</span>
          </Text>
          <P className='text-base'>All rights Reserved</P>
          <Text>Built with ❤ && ⚡</Text>
        </div>
      </footer>
    </>
  );
}
