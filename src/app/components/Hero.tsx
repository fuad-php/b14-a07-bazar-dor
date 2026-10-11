
import BanglaDate from "./BanglaDate";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="grid grid-cols-2 items-center gap-8 p-5 sm:p-8 md:grid-cols-2 md:gap-6 lg:p-12">
        {/* Hero content */}
        <div className="flex flex-col items-start">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-green-300/10 text-sm font-semibold text-green-600">            
            <BanglaDate />
          </div>

          <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-base-content sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mb-6 max-w-xl text-base leading-8 text-base-content/70 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম—
            বাজারভিত্তিক তথ্য, সর্বনিম্ন ও সর্বোচ্চ মূল্য এবং
            দামের পরিবর্তন জানুন এক জায়গায়।
          </p>

          <Link
            href="#all-products"
            className="btn brand-button w-full font-bold sm:w-auto"
          >
            সব পণ্য দেখুন
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Hero image */}
        <div className="relative mx-auto flex w-full max-w-md items-center justify-center md:justify-end">
          <div className="absolute aspect-square w-4/5 rounded-full bg-primary/10 blur-2xl" />

          <Image
            src="/bazar-hero.png"
            width={500}
            height={500}
            alt="বাজারের বিভিন্ন নিত্যপ্রয়োজনীয় পণ্য"
            priority
            sizes="(max-width: 767px) 85vw, (max-width: 1023px) 45vw, 500px"
            className="relative h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
