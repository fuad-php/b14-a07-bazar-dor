import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import BanglaDate from "./BanglaDate";

const Navbar = () => {
  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto w-full max-w-7xl px-4">
        {/* Top Navbar */}
        <div className="flex items-center justify-between gap-4 py-4">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            aria-label="Bazar Dor home"
          >
            <Image
              src="/logo-icon.png"
              alt="Bazar Dor Logo"
              width={44}
              height={44}
              priority
              className="shrink-0 rounded-xl bg-primary p-1.5"
            />

            <div className="flex min-w-0 flex-col">
              <span className="text-xl font-bold text-base-content sm:text-2xl">
                বাজার দর
              </span>

              <span className="text-xs text-base-content/60 sm:text-sm">
                <BanglaDate />
              </span>
            </div>
          </Link>

          {/* Authentication Buttons */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/login"
              className="btn btn-sm border-base-300 bg-base-100 text-base-content hover:bg-base-200 sm:btn-md"
            >
              সাইন ইন
            </Link>

            <Link
              href="/register"
              className="btn btn-sm btn-primary sm:btn-md"
            >
              রেজিস্টার
            </Link>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t border-base-300 py-2">
          <NavLinks />
        </div>
      </div>
    </header>
  );
};

export default Navbar;