
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import BanglaDate from "./BanglaDate";
import UserInfo from "./UserInfo";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-200">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex min-h-20 items-center justify-between gap-3 py-3 sm:gap-6">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
            aria-label="বাজার দর হোম"
          >
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={46}
              height={46}
              priority
              className="size-10 shrink-0 rounded-xl brand-color-logo p-1.5 sm:size-12"
            />

            <div className="flex min-w-0 flex-col">
              <span className="text-4xl font-bold leading-tight text-brand-color sm:text-2xl">
                বাজার দর
              </span>

              <span className="mt-1 text-xs leading-tight text-base-content/60 sm:text-sm">
                <BanglaDate />
              </span>
            </div>
          </Link>

          {/* Authentication Buttons */}
          <UserInfo/>
        </div>
      </div>

      {/* Category Navigation */}
      <nav aria-label="পণ্যের ক্যাটাগরি" className="border-t border-base-300 bg-base-200" >
        <div className="page-container">
          <div className="overflow-x-auto">
            <NavLinks />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
