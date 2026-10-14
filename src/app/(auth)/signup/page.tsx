
"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setMessage("");
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);

        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");
        const password2 = String(formData.get("password2") ?? "");

        if (password.length < 8) {            
            toast.warning("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
            return;
        }

        if (password !== password2) {            
            toast.warning("দুটি পাসওয়ার্ড মিলছে না।");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: "/",
            });

            if (error) {                
                toast.error(error.message)
                return;
            }

            if (data) {                
                toast.success("সাইন আপ সফল হয়েছে!");
            }
        } catch {            
            toast.error("একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setErrorMessage("");

        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                setErrorMessage(error.message || "Google দিয়ে সাইন ইন করা যায়নি।");
            }
        } catch {
            setErrorMessage("Google দিয়ে সাইন ইন করার সময় সমস্যা হয়েছে।");
        }
    };

    const signInWithGithub = async () => {
        setErrorMessage("");

        try {
            const { error } = await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });

            if (error) {
                setErrorMessage(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি।");
            }
        } catch {
            setErrorMessage("GitHub দিয়ে সাইন ইন করার সময় সমস্যা হয়েছে।");
        }
    };

    return (
        <main className="px-4 py-8">
            <div className="mx-auto max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold"> অ্যাকাউন্ট তৈরি করুন </h1>

                    <p className="mt-2 text-base-content/70">
                        বিনা খরচায় সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                <form onSubmit={onSubmit} className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm" >                                        
                    <fieldset className="fieldset mb-3">
                        <label className="label text-base" htmlFor="name">
                            নাম
                        </label>
                        <input type="text" id="name" name="name" className="input w-full" placeholder="ফুয়াদ আল আমিন" autoComplete="name" required />
                    </fieldset>

                    <fieldset className="fieldset mb-3">
                        <label className="label text-base" htmlFor="email">
                            ইমেইল
                        </label>
                        <input type="email" id="email" name="email" className="input w-full" placeholder="you@example.com" autoComplete="email" required />
                    </fieldset>

                    <fieldset className="fieldset mb-3">
                        <label className="label text-base" htmlFor="password">
                            পাসওয়ার্ড
                        </label>
                        <input type="password" id="password" name="password" className="input w-full" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="new-password" minLength={8} required />
                    </fieldset>

                    <fieldset className="fieldset mb-3">
                        <label className="label text-base" htmlFor="password2">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input type="password" id="password2" name="password2" className="input w-full" placeholder="আবার লিখুন" autoComplete="new-password" minLength={8} required />
                    </fieldset>

                    <button type="submit" className="btn brand-button mt-4 w-full" disabled={loading} >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm" />
                                অ্যাকাউন্ট তৈরি হচ্ছে...
                            </>
                        ) : (
                            "সাইন আপ"
                        )}
                    </button>

                    <div className="divider">অথবা</div>

                    <div className="flex justify-center gap-3">
                        <button type="button" onClick={signInWithGoogle} className="btn btn-md p-2">
                            <FcGoogle size={22} />
                            Google দিয়ে চালিয়ে যান
                        </button>

                        <button type="button" onClick={signInWithGithub} className="btn btn-md p-2" >
                            <FaGithub size={22} />
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    <p className="mt-6 text-center text-sm">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link href="/signin" className="font-semibold !text-green-600 hover:underline">
                            সাইন ইন করুন
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default SignUpPage;