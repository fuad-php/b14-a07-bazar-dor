
"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";

type ProfileUser = {
  id: string;
  name: string;
  email: string;
};

type ProfileFormProps = {
  user: ProfileUser;
  onUpdate: (name: string) => Promise<void>;
};

function ProfileForm({ user, onUpdate }: ProfileFormProps) {
  const [name, setName] = useState(user.name);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      toast.error("নাম ২ থেকে ১০০ অক্ষরের মধ্যে হতে হবে।");
      return;
    }

    if (trimmedName === user.name) {
      toast.info("আপনার নামে কোনো পরিবর্তন হয়নি।");
      return;
    }

    setIsUpdating(true);

    try {
      await onUpdate(trimmedName);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "প্রোফাইল আপডেট করার সময় সমস্যা হয়েছে।"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-base-content">
          প্রোফাইলের তথ্য
        </h2>

        <p className="mt-2 text-sm text-base-content/70">
          আপনার নাম পরিবর্তন করতে নিচের ফর্মটি ব্যবহার করুন।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <fieldset className="fieldset">
          <label
            htmlFor="name"
            className="label text-base font-medium text-base-content"
          >
            আপনার নাম
          </label>

          <input
            id="name"
            name="name"
            type="text"
            className="input w-full border border-base-300 bg-base-100"
            placeholder="আপনার নাম লিখুন"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isUpdating}
            required
          />

          <p className="mt-1 text-xs text-base-content/60">
            নাম ২ থেকে ১০০ অক্ষরের মধ্যে হতে হবে।
          </p>
        </fieldset>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="btn btn-ghost w-full sm:w-auto"
            onClick={() => setName(user.name)}
            disabled={isUpdating || name === user.name}
          >
            বাতিল
          </button>

          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto"
            disabled={
              isUpdating ||
              name.trim().length < 2 ||
              name.trim().length > 100 ||
              name.trim() === user.name
            }
          >
            {isUpdating ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                আপডেট হচ্ছে...
              </>
            ) : (
              "পরিবর্তন সংরক্ষণ করুন"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

const ProfilePage = () => {
  const router = useRouter();

  const { data: userSession, isPending } = authClient.useSession();
  const user = userSession?.user;

  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleProfileUpdate = async (name: string) => {
    const { error } = await authClient.updateUser({ name });

    if (error) {
      throw new Error(
        error.message || "প্রোফাইল আপডেট করা যায়নি।"
      );
    }

    toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");

    router.refresh();
  };

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করার সময় সমস্যা হয়েছে।");
    } finally {
      setIsSigningOut(false);
    }
  };

  // Loading state
  if (isPending) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="animate-pulse space-y-5">
          <div className="h-8 w-48 rounded-lg bg-base-300" />
          <div className="h-28 rounded-2xl bg-base-200" />
          <div className="h-56 rounded-2xl bg-base-200" />
        </div>
      </main>
    );
  }

  // Unauthenticated state
  if (!user) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm sm:p-10">
          <h1 className="text-2xl font-bold text-base-content">
            আপনি সাইন ইন করেননি
          </h1>

          <p className="mt-3 text-base-content/70">
            আপনার প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
          </p>

          <button
            type="button"
            className="btn btn-primary mt-6"
            onClick={() => router.push("/signin")}
          >
            সাইন ইন করুন
          </button>
        </section>
      </main>
    );
  }

  // Authenticated profile
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-base-content/70 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য দেখুন এবং প্রয়োজন অনুযায়ী আপডেট করুন।
          </p>
        </div>

        {/* User information */}
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <Image
                src="/user_default_avatar.png"
                width={64}
                height={64}
                alt="User avatar"
                className="shrink-0 rounded-full border border-base-300 object-cover"
              />

              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-base-content sm:text-xl">
                  {user.name}
                </h2>

                <p className="mt-1 break-all text-sm text-base-content/70">
                  {user.email}
                </p>

                <span className="mt-2 inline-flex rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                  অ্যাকাউন্ট সক্রিয়
                </span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline btn-error w-full rounded-lg sm:w-auto"
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              {isSigningOut ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  সাইন আউট হচ্ছে...
                </>
              ) : (
                <>
                  <MdOutlineSubdirectoryArrowLeft size={20} />
                  সাইন আউট
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editable profile form */}
        <ProfileForm
          key={user.id}
          user={{
            id: user.id,
            name: user.name,
            email: user.email,
          }}
          onUpdate={handleProfileUpdate}
        />
      </section>
    </main>
  );
};

export default ProfilePage;
