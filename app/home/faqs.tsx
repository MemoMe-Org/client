import { useState } from 'react';
import { faqs } from '@/data/data';
import { MinusIcon, PlusIcon } from '@/public/svgs/svg';
import { monst } from '@/public/fonts/f';
import { P } from '@/utils/typography';

const FaqItem: React.FC<FaqItemProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`block`} id='faqs'>
      <div
        onClick={toggle}
        className={` flex flex-row justify-between self-start items-center text-[15px] rounded-[2px] min-w-[1200px] p-[17px] md:pl-[10px] md:text-[20px] font-semibold ${
          isOpen ? 'bg-memo/10' : 'bg-white text-black'
        }`}
      >
        {faq.question}
        {isOpen ? (
          <figure className='bg-memo rounded-full p-2'>
            <MinusIcon
              className={`transition-all duration-200 w-[14px] h-[14px] md:w-[24px] md:h-[24px]`}
            />
          </figure>
        ) : (
          <figure className='border border-memo rounded-full p-2 '>
            <PlusIcon
              className={`transition-all duration-200 w-[14px] h-[14px] md:w-[24px] md:h-[24px]`}
            />
          </figure>
        )}
      </div>

      <div
        className={`transition-all duration-300 ${
          isOpen
            ? 'md:backdrop:max-h-[255px] self-start pt-[14px] pb-[20px] md:pb-[40px] md:pt-[25px]'
            : 'h-0 pb-0 pt-0'
        } overflow-hidden bg-white pr-[14px] pl-[10px] md:pr-[25px]`}
      >
        <p className='text-[#363636] text-[15px] max-w-max self-start md:text-[18px] font-normal'>
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const Faqs: React.FC<FaqsProps> = () => {
  return (
    <section
      className={`${monst.className} mt-[40px] mx-[32px] md:mx-[66px] md:mt-[55px]`}
    >
      <div>
        <h2
          className={`text-black mx-auto block text-center font-semibold  text-[30px] md:text-[45px] md:leading-[64px]`}
        >
          Frequently Asked <span className='text-memo'>Questions</span>
        </h2>
        <P className='text-[#959595] leading-[64px] text-[20px] font-semibold mx-auto text-center '>
          have question? we are here to help
        </P>

        <div className='lg:cursor-pointer mt-[37px] space-y-3 lg:space-y-0 lg:flex lg:flex-col items-center mx-[97px] lg:gap-4'>
          {faqs.map((faq, index) => (
            <FaqItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
