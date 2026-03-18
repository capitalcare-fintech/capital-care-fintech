"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSignedIn, getUser } from "@/lib/authClient";
import { useAuth } from "@/lib/useAuth";

export default function DashboardPage() {
    const router = useRouter();
    const { signOut } = useAuth();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        if (!getSignedIn()) {
            router.replace("/sign-in");
            return;
        }
        const user = getUser();
        if (user) setUserName(user.name);
    }, [router]);

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <h1 className="mb-2 text-2xl font-bold text-white">
                    Welcome{userName ? `, ${userName}` : ""}
                </h1>
                <p className="mb-8 text-sm text-white/60">You are signed in to your CapitalCare account.</p>
                <button
                    type="button"
                    onClick={() => {
                        signOut();
                        router.push("/");
                    }}
                    className="rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
}
