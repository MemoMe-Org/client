import { useState } from 'react';
import { faqs } from '@/data/data';
import { MinusIcon, PlusIcon } from '@/public/svgs/svg';
import { monst } from '@/public/fonts/f';

const FaqItem: React.FC<FaqItemProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`mx-auto block`} id='faqs'>
      <div
        onClick={toggle}
        className={`cursor-pointe  md:max-w-[642px] flex justify-between items-center text-[15px] rounded-[2px] p-[17px] md:p-[30px] md:text-[20px] font-medium ${
          isOpen ? 'bg-[#6503BF] text-white' : 'bg-white text-black'
        }`}
      >
        {faq.question}
        {isOpen ? (
          <MinusIcon
            className={`transition-all duration-200 w-[14px] h-[14px] md:w-[24px] md:h-[24px]`}
          />
        ) : (
          <PlusIcon
            className={`transition-all duration-200 w-[14px] h-[14px] md:w-[24px] md:h-[24px]`}
          />
        )}
      </div>

      <div
        className={`h-aut transition-all duration-300 ${
          isOpen
            ? 'md:backdrop:max-h-[255px] pt-[14px] pb-[30px] md:pb-[85px] md:pt-[25px]'
            : 'h-0 pb-0 pt-0'
        } overflow-hidden bg-white max-w-[367px] max-w-max px-[14px] lg:max-w-[642px] md:px-[25px]`}
      >
        <p className='text-[#000000] text-[15px] w-full  px md:text-[20px] lg:max-w-[579px] font-normal'>
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

interface FaqsProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const Faqs: React.FC<FaqsProps> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    if (index === openIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  return (
    <section
      className={`${monst.className} mt-[40px] mx-[32px] md:mx-[66px] md:mt-[55px]`}
    >
      <div>
        <h2
          className={`text-[#00453B] mx-auto block text-center font-semibold  text-[30px] max-w-[272px]  md:max-w-max md:text-[40px] md:leading-[49px]`}
        >
          Frequently Asked Question
        </h2>

        <div className='lg:cursor-pointer mt-[37px] space-y-3 lg:space-y-0 lg:flex lg:flex-row lg:flex-wrap lg:gap-4 lg:mt-[95px]'>
          {faqs.map((faq, index) => (
            <FaqItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
