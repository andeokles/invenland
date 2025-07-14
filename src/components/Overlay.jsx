import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { scenes } from "./Experience";

export const slideAtom = atom(0);

export const Overlay = () => {
  const [slide, setSlide] = useAtom(slideAtom);
  const [displaySlide, setDisplaySlide] = useState(slide);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1000);
  }, []);

  useEffect(() => {
    setVisible(false);
    setTimeout(() => {
      setDisplaySlide(slide);
      setVisible(true);
    }, 2600);
  }, [slide]);
  return (
    <>
      <div
        className={`fixed z-10 top-0 left-0 bottom-0 right-0 flex flex-col justify-between pointer-events-none text-white ${
          visible ? "" : "opacity-0"
        } transition-opacity duration-1000`}
      >
    <h1
      className="mx-auto mt-8 pointer-events-auto 
                 text-2xl sm:text-3xl md:text-4xl 
                 font-extrabold tracking-tight"
      style={{ fontFamily: "'DancingScript', sans-serif" }}
    >
    Brain Trainer Stilo
    </h1>

        <div className="absolute top-0 bottom-0 left-0 right-0 flex-1 flex items-center justify-between p-4">
          <svg
            onClick={() =>
              setSlide((prev) => (prev > 0 ? prev - 1 : scenes.length - 1))
            }
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
            onClick={() =>
              setSlide((prev) => (prev < scenes.length - 1 ? prev + 1 : 0))
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
        <div className="bg-transparent pt-20 pb-10 p-4 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold">
            {scenes[displaySlide].name}
          </h1>
          <p className="text-opacity-60 italic">
            {scenes[displaySlide].description}
          </p>
          <div className="flex justify-center mt-10">
          <button className="border border-white rounded-full px-6 py-3 text-white font-semibold cursor-pointer transition transform duration-200 hover:bg-white/10 hover:scale-105 active:scale-95 active:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50">
          Elegir Avatar
          </button>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default Overlay;