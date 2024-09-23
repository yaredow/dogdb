import Image from "next/image";
import HeroImgMob from "@/../public/images/hero/dogfield-mobile.png";
import HeroImg from "@/../public/images/hero/dog-running.jpg";
import SearchBar from "@/components/ui/search-bar";

function Hero() {
  return (
    <section className="text-secondary-body">
      <div className="flex flex-col pb-8 pt-4 md:flex-row md:pt-6">
        {/* Desktop Image */}
        <div className="relative hidden min-h-[279px] w-full p-4 md:block md:h-auto md:w-full md:p-0">
          <Image
            src={HeroImg}
            alt="an image of dog running with joy"
            fill
            className="rounded-btn object-cover shadow-lg"
            sizes={"100%"}
            unoptimized={true}
          />
        </div>

        {/* Mobile Image */}
        <div className="relative min-h-[279px] p-4 md:hidden md:h-auto md:w-full md:p-0">
          <Image
            src={HeroImgMob}
            alt="an image of dog running in a field with joy"
            fill
            className="rounded-btn w-screen object-cover shadow-lg"
            sizes={"100%"}
            unoptimized={true}
          />
          <h2 className="tracking-regular font-regular font-main absolute bottom-2 p-2 text-4xl leading-none text-white shadow">
            Find your perfect <br /> dog breed
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center md:items-start md:pl-6">
          <h2 className="tracking-regular font-main text-secondary-body hidden text-[40px] font-bold leading-none md:block md:leading-tight">
            Doggo. Find your perfect dog breed
          </h2>
          <p className="font-regular text-secondary-body px-10 py-6 text-center font-sans text-3xl leading-8 md:px-0 md:py-0 md:text-left md:text-sm">
            Discover the ideal companion for your lifestyle
          </p>
          <div className="w-full pt-4">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
