
"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-base-100 px-4 py-12">
      <div className="w-full max-w-lg text-center">

        {/* 404 Illustration */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-base-100 shadow-lg">
            <SearchX className="h-12 w-12 text-error" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="mb-2 text-7xl font-extrabold tracking-tight text-primary sm:text-8xl">
          ৪০৪
        </h1>

        {/* Bangla Message */}
        <h2 className="mb-3 text-2xl font-bold text-base-content sm:text-3xl">
          দুঃখিত! পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mx-auto mb-8 max-w-md leading-7 text-base-content/70">
          আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
          পৃষ্ঠাটি সরিয়ে ফেলা হয়ে থাকতে পারে অথবা
          ওয়েব ঠিকানাটি ভুল হতে পারে।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-success gap-2">
            <Home size={18} />
            হোম পেজে ফিরুন
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn btn-outline gap-2"
          >
            <ArrowLeft size={18} />
            আগের পৃষ্ঠায় ফিরুন
          </button>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-base-content/50">
          ত্রুটি কোড: ৪০৪ — পৃষ্ঠাটি বিদ্যমান নেই।
        </p>
      </div>
    </main>
  );
};

export default NotFound;
