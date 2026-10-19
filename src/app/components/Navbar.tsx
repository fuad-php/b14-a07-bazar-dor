
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import BanglaDate from "./BanglaDate";
import UserInfo from "./UserInfo";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-200">
      {/* Main Navbar */}
      <div className="mx-auto max-w-6xl px-3 sm:px-5 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3 py-2 sm:min-h-20 sm:gap-6">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 sm:gap-3"
            aria-label="বাজার দর হোম"
          >
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={48}
              height={48}
              priority
              className="brand-color-logo size-9 shrink-0 rounded-lg p-1 sm:size-11 sm:rounded-xl sm:p-1.5"
            />

            <div className="flex min-w-0 flex-col">
              <span className="text-xl font-bold leading-tight text-brand-color sm:text-2xl lg:text-3xl">
                বাজার দর
              </span>

              <span className="mt-1 hidden text-xs leading-tight text-base-content/60 min-[360px]:block sm:text-sm">
                <BanglaDate />
              </span>
            </div>
          </Link>

          {/* Authentication */}
          <div className="flex shrink-0 items-center">
            <UserInfo />
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className="border-t border-base-300 bg-base-200"
      >
        <div className="mx-auto max-w-6xl">
          <div className="overflow-x-auto overscroll-x-contain">
            <NavLinks />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;