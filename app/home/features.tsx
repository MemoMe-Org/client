import { monst } from '@/public/fonts/f';
import { H1, H3, P } from '@/utils/typography';
import { features } from '@/data/data';
import Image from 'next/image';

export default function Features() {
  return (
    <section
      id='features'
      className={`${monst.className} bg-[#FAFAFA] pt-[62px]`}
    >
      <div className='flex flex-col items-center mx-auto font-alt'>
        <H1>Features </H1>
        <P>This are the ultimate features in memome</P>
      </div>
      <div className='flex flex-row flex-wrap justify-center mx-auto items-center gap-5 mt-[85px]'>
        {features.map((feature) => (
          <div
            key={feature?.id}
            className='group transition-all duration-300 hover:scale-[.96] bg-white rounded-[10px] h-[377px] w-full md:max-w-[440px] md:pt-[45px] px-[36px] md:pb-[43px] hover:bg-memo/10'
          >
            <figure>
              <Image
                src={feature?.logo}
                alt={feature?.title}
                priority
                draggable={false}
                className='object-cover'
              />
              <H3 className='md:mt-[25px]'>{feature?.title}</H3>
              <P
                className={`md:mt-[19px] ${feature?.styles} text-[#6E6E6E] leading-[23px] max-w-[375px]`}
              >
                {feature?.content}
              </P>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}
