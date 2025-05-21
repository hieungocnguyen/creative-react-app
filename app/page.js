import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"] });

export default function Home() {
  const list = [
    {
      title: "Onboardy",
      color: "#FFC91D",
    },
    {
      title: "Vietnam Innovators Digest",
      color: "#D62238",
    },
    {
      title: "Well-ness",
      color: "#65CEA3",
    },
    {
      title: "Flavors",
      color: "#EF2C0C",
    },
    {
      title: "RadioOn TV",
      color: "#6F00FF",
    },
  ];
  return (
    <main className={oswald.className}>
      <CustomCursor />
      <div className="flex flex-col justify-center items-start gap-3 h-screen relative z-10 p-10">
        {list.map((item, index) => (
          <h2
            key={index}
            className="text-7xl font-semibold tracking-tight"
            data-cursor-color={item.color}
          >
            {item.title}
          </h2>
        ))}
      </div>
    </main>
  );
}
