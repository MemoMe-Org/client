import { P } from '@/utils/typography';

export default function Footer() {
  return (
    <footer className='flex flex-row px-[31px] mt-[100px]'>
      <div className=''>
        <P className='text-[#4F4F4F]  text-lg leading-[33px]'>
           Copyright <span>&copy;</span>&nbsp;
          <span>{new Date().getFullYear()} </span> Molten 
        </P>
      </div>
    </footer>
  );
}
