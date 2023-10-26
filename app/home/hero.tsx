import hero from '@/public/images/hero.png';
import wave from '@/public/images/wave.png';
import Image from 'next/image';

export default function Hero() {
  return (
    <section>
      <div className='relative flex flex-col items-center'>
        <figure className='absolute bottom-0'>
          <Image
            src={wave}
            fetchPriority='high'
            placeholder='blur'
            priority
            draggable={false}
            alt='wave illustration'
            className='mx-aut object-cover block'
          />
        </figure>
        <figure className='relative z-20 group bg-hero mt-[40px] px-[41px] py-[42px] rounded-[20px] outline-red-300 outline w-fit mx-auto'>
          <Image
            src={hero}
            fetchPriority='high'
            placeholder='blur'
            priority
            draggable={false}
            alt='hero_img'
            className='mx-auto object-cover block transition-all duration-300 group-hover:scale-[.96]'
          />
        </figure>
      </div>
    </section>
  );
}
