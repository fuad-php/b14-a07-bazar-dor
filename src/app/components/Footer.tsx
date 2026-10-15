import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-base-300 bg-base-100 text-base-content">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-3 py-5 text-center text-sm leading-relaxed sm:flex-row sm:text-left">
                    <p>
                        <span className="font-semibold">বাজার দর</span>
                        <span className="mx-2 hidden text-base-content/40 sm:inline">|</span>
                        প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>

                    <p className="text-base-content/70">
                        সকল দাম সম্ভাব্য। বাজার পরিস্থিতির উপর নির্ভর করে
                        দাম পরিবর্তিত হতে পারে।
                    </p>
                </div>                
            </div>
        </footer>
    );
};

export default Footer;