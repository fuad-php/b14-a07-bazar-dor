
"use client";

import Link from "next/link";
import { useState } from "react";
import type { SubmitEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrorMessage("");
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                setErrorMessage(
                    error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
                );
            }
        } catch {
            setErrorMessage(
                "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialSignIn = async (
        provider: "google" | "github"
    ) => {
        setErrorMessage("");

        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (error) {
                setErrorMessage(
                    error.message || "সোশ্যাল সাইন ইন ব্যর্থ হয়েছে।"
                );
            }
        } catch {
            setErrorMessage("আবার চেষ্টা করুন।");
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-8 px-4">
            <div className="flex flex-col gap-3 items-center justify-center mb-4">
                <h2 className="font-bold text-3xl">সাইন ইন</h2>

                <p className="text-center text-base-content/70">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
                    অ্যাকাউন্টে ঢুকুন।
                </p>

                <div className="flex justify-center mt-4 w-full">
                    <form
                        onSubmit={onSubmit}
                        className="text-center bg-base-100 p-6 border border-base-300 rounded-box w-full max-w-md"
                    >
                        <fieldset className="fieldset text-left">
                            <label className="label text-lg" htmlFor="email">
                                ইমেইল
                            </label>
                            <input type="email" id="email" name="email" className="input input-bordered w-full" placeholder="you@example.com" autoComplete="email" required />
                        </fieldset>

                        <fieldset className="fieldset text-left mt-3">
                            <label className="label text-lg" htmlFor="password" >
                                পাসওয়ার্ড
                            </label>
                            <input type="password" id="password" name="password" className="input input-bordered w-full" placeholder="আপনার পাসওয়ার্ড লিখুন" autoComplete="current-password" required />
                        </fieldset>

                        {errorMessage && (
                            <p
                                role="alert"
                                className="text-error text-sm mt-4"
                            >
                                {errorMessage}
                            </p>
                        )}

                        <button type="submit" disabled={isLoading} className="btn brand-button mt-4 w-full">
                            {
                                isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"
                            }
                        </button>

                        <div className="divider">অথবা</div>

                        <div className="flex justify-center gap-3">
                            <button type="button" className="btn btn-md p-2" onClick={() => handleSocialSignIn("google")} >
                                <FcGoogle size={20} />
                                Google দিয়ে চালিয়ে যান
                            </button>

                            <button type="button" className="btn btn-md p-2" onClick={() => handleSocialSignIn("github")} >
                                <FaGithub size={20} />
                                GitHub দিয়ে চালিয়ে যান
                            </button>
                        </div>

                        <p className="text-center mt-4">
                            অ্যাকাউন্ট নেই?{" "}
                            <Link
                                href="/signup"
                                className="text-green-600 hover:underline"
                            >
                                সাইন আপ করুন
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;