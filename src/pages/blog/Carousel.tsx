import React, { useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  { src: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(123).jpg', alt: 'First slide', title: 'First slide label', description: 'Some representative placeholder content for the first slide.' },
  { src: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(124).jpg', alt: 'Second slide', title: 'Second slide label', description: 'Some representative placeholder content for the second slide.' },
  { src: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(125).jpg', alt: 'Third slide', title: 'Third slide label', description: 'Some representative placeholder content for the third slide.' }
];

export const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div id="carouselExampleCaptions" className="relative w-full h-[500px] overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none ${currentIndex === index ? 'opacity-100' : ''}`}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      
      <div className="relative w-full h-full overflow-hidden">
        <motion.div
          className="relative flex w-full transition-transform duration-[600ms] ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="relative flex-shrink-0 w-full h-full">
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <h5 className="text-3xl font-bold mb-2">{image.title}</h5>
                <p className="text-lg">{image.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      <button
        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:opacity-90"
        type="button"
        onClick={handlePrev}
      >
        <span className="inline-block h-8 w-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </span>
        <span className="sr-only">Previous</span>
      </button>
      <button
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:opacity-90"
        type="button"
        onClick={handleNext}
      >
        <span className="inline-block h-8 w-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};
