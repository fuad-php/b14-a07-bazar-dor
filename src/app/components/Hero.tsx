import BanglaDate from './BanglaDate';
import Link from 'next/link';

const Hero = () => {
    return (
        <div className="flex w-full flex-col justify-center bg-base-300 rounded-lg shadow-lg p-8">
            <div className="badge bg-primary/10 mb-4 p-2">
                <BanglaDate/>
            </div>
            <h2 className="text-4xl font-bold mb-4 p-2">আজকের বাজারের দাম এক নজরে</h2>
            <p className="text-lg text-gray-600 mb-4 p-2">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম - বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়। 
            </p>
            <Link href="/products">
                <button className="btn btn-primary font-bold mt-4 text-white brand-button">সব পণ্য দেখুন</button>
            </Link>
        </div>
    );
};

export default Hero;