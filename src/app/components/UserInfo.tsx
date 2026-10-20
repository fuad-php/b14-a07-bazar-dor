
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { data: userSession, isPending } = authClient.useSession();
  const user = userSession?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("User logged out successfully!");
            router.refresh();
            router.push("/signin");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Logout failed!");
          },
        },
      });
    } catch {
      toast.error("Something went wrong while logging out!");
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <span className="loading loading-spinner loading-sm" />
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost flex h-auto items-center gap-3 px-2"
          >
            <div className="avatar">
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                <Image
                  src={user.image || "/user_default_avatar.png"}
                  alt="User avatar"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
            </div>

            <span className="max-w-32 truncate font-bold">
              {user.name}
            </span>
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-50 mt-3 w-64 rounded-box bg-base-100 p-3 shadow-lg"
          >
            <li>
              <span className="pointer-events-none font-bold text-lg">
                {user.name}
              </span>
            </li>

            <li>
              <span className="pointer-events-none mb-3 break-all text-sm opacity-70">
                {user.email}
              </span>
            </li>

            <li>
              <Link href="/profile">
                <FaUser />
                আমার প্রোফাইল
              </Link>
            </li>

            <li>
              <button
                type="button"
                className="btn btn-error btn-sm mt-3 font-bold"
                onClick={handleSignOut}
              >
                <MdOutlineSubdirectoryArrowLeft />
                সাইন আউট
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <Link
            href="/signin"
            className="btn btn-sm border-base-300 bg-base-100 text-base-content hover:border-primary hover:bg-primary/5 sm:btn-md"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="btn btn-primary btn-sm sm:btn-md brand-button"
          >
            সাইন আপ
          </Link>
        </>
      )}
    </div>
  );
};

export default UserInfo;
