import { monst } from '@/public/fonts/f';
import { H3, P } from '@/utils/typography';

export default function Footer() {
  return (
    <>
      <footer
        className={` ${monst.className} flex flex-row justify-center px-[31px] mt-[100px]`}
      >
        <div className='flex flex-col items-center'>
          <H3 className='text-base'>All rights Reserved</H3>
          <P className='text-[#4F4F4F] !text-base md:!text-lg leading-[33px]'>
             Copyright <span>&copy;</span>&nbsp;
            <span>{new Date().getFullYear()} </span> MemoMe
          </P>
          <P>Built with ❤</P>
        </div>
      </footer>
    </>
  );
}
