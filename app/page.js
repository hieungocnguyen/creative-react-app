"use client";
import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";
import { Oswald } from "next/font/google";
import { useState, useEffect, useRef } from "react";

const oswald = Oswald({ subsets: ["latin"] });

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  
  const list = [
    {
      title: "Onboardy",
      color: "#FFC91D",
      image:
        "https://images.pexels.com/photos/925786/pexels-photo-925786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Vietnam Innovators Digest",
      color: "#D62238",
      image:
        "https://images.pexels.com/photos/30844465/pexels-photo-30844465/free-photo-of-c-nh-dem-t-i-nha-hat-l-n-thanh-ph-h-chi-minh.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Well-ness",
      color: "#65CEA3",
      image:
        "https://images.pexels.com/photos/3775603/pexels-photo-3775603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Flavors",
      color: "#EF2C0C",
      image:
        "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "RadioOn TV",
      color: "#6F00FF",
      image:
        "https://images.pexels.com/photos/14925309/pexels-photo-14925309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollTop;
        const itemHeight = scrollContainerRef.current.offsetHeight;
        const newIndex = Math.round(scrollPosition / itemHeight);
        
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < list.length) {
          setCurrentIndex(newIndex);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentIndex, list.length]);

  const scrollToItem = (index) => {
    if (scrollContainerRef.current) {
      const itemHeight = scrollContainerRef.current.offsetHeight;
      scrollContainerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className={oswald.className}>
      <CustomCursor />
      <div className="fixed flex flex-col justify-center items-start h-screen z-100 p-10">
        {list.map((item, index) => (
          <h2
            key={index}
            className={`text-7xl font-semibold tracking-tight p-3 cursor-pointer transition-all duration-300 text-white`}
            data-cursor-color={item.color}
            onClick={() => scrollToItem(index)}
          >
            {item.title}
          </h2>
        ))}
      </div>
      <div 
        ref={scrollContainerRef} 
        className="flex flex-col overflow-y-auto snap-y snap-mandatory w-screen h-screen scrollbar-hide"
        style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {list.map((item, index) => (
          <div key={index} className="min-h-full w-screen h-screen snap-start relative flex-shrink-0">
            <Image
              src={item.image}
              alt={item.title}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
            />
            <div 
              className="absolute inset-0"
              style={{ background: `linear-gradient(to right, rgba(0,0,0,0.7) 40%, ${item.color}CC)` }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
