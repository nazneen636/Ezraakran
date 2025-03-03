import Image from "next/image";
import { Button } from "@/components/ui/button";
import conferenceBanner from "@/assets/conference Banner/banner.jpg";

export default function ConferenceBanner() {
  return (
    <div className="px-2 md:px-0">
      <section className="container  border rounded-3xl mx-auto px-3 md:px-12 lg:px-16 py-4 md:py-16 lg:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="flex-1 space-y-1">
            <div className="text-red text-base sm:text-2xl font-bold">
              Feb 27 – Mar 2, 2023
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-6xl font-bold tracking-tight leading-tight">
              Big Global
              <br />
              E-Commerce
              <br />
              Conference &apos;23
            </h1>
            <div className="flex items-center gap-2 text-red text-sm">
              <span>Join Our Next Lotcom</span>
              {/* <span className="text-gray-400">•</span>
            <span>IT Education Centre</span> */}
            </div>
            <Button className="bg-red hover:bg-darkBlue duration-300 transition-all font-bold text-white px-6 py-4 rounded-md">
              Buy a Ticket
            </Button>
          </div>

          {/* Right Column with Image */}
          <div className="flex-1 w-full">
            <div className="relative aspect-[4/3] w-full max-w-md sm:max-w-lg md:max-w-full">
              <Image
                src={conferenceBanner}
                alt="Conference presentation on laptop"
                fill
                className="object-cover rounded-3xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
