"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { ArrowLeft, LockKeyhole, MailCheck, RefreshCw, ShieldCheck } from "lucide-react";

interface LoginProps {
  onLogin: (user: { name: string; email: string; role: string }) => void;
}

export function AdminLogin({ onLogin }: LoginProps) {
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [emailHint, setEmailHint] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function handleCredentials(e: FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      setChallengeId(data.challengeId);
      setEmailHint(data.emailHint || email);
      setCode("");
      setStep("otp");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOtp(e: FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ challengeId, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Verification failed");
        return;
      }
      onLogin(data.user);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function resendCode() {
    if (!challengeId) return;
    setError("");
    setNotice("");
    setResending(true);
    try {
      const res = await fetch("/api/admin/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ challengeId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not resend the code.");
        return;
      }
      if (data.challengeId) setChallengeId(data.challengeId);
      setCode("");
      setNotice("A new verification code was sent.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setResending(false);
    }
  }

  function backToCredentials() {
    setStep("credentials");
    setError("");
    setNotice("");
    setPassword("");
    setCode("");
    setChallengeId("");
  }

  return (
    <div className="min-h-screen bg-[#f4f4f2] grid lg:grid-cols-[1.05fr_.95fr]">
      <section className="hidden lg:flex bg-black text-white p-12 xl:p-16 flex-col justify-between">
        <div className="w-fit rounded-2xl bg-white p-4">
          <Image src="/images/logo-black.png" alt="Markit Media" width={190} height={58} className="h-10 w-auto object-contain" priority />
        </div>
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[.28em] text-zinc-500">Internal workspace</p>
          <h1 className="mt-5 text-5xl xl:text-6xl font-black tracking-[-.04em] leading-[.98]">One secure place for leads, content and growth data.</h1>
          <p className="mt-6 text-base leading-7 text-zinc-400">Password verification, email two-factor authentication and private sessions protect dashboard access.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500"><ShieldCheck size={16}/> Private Markit Media system</div>
      </section>

      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Image src="/images/logo-black.png" alt="Markit Media" width={180} height={54} className="h-10 w-auto object-contain" priority />
          </div>
          <div className="rounded-3xl border border-black/10 bg-white p-7 sm:p-9 shadow-[0_25px_80px_rgba(0,0,0,.07)]">
            <div className="h-12 w-12 rounded-2xl bg-black text-white grid place-items-center">{step === "otp" ? <MailCheck size={21}/> : <LockKeyhole size={21}/>}</div>
            <h2 className="mt-6 text-3xl font-black tracking-tight">{step === "otp" ? "Check your email" : "Dashboard sign in"}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">{step === "otp" ? `We sent a 6-digit verification code to ${emailHint}. The code expires in 10 minutes.` : "Sign in with any authorized dashboard email address."}</p>

            {step === "credentials" ? (
              <form onSubmit={handleCredentials} className="mt-7 space-y-5">
                <label className="block text-sm font-bold">Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email" className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3.5 outline-none focus:border-black" placeholder="you@example.com"/></label>
                <label className="block text-sm font-bold">Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password" className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3.5 outline-none focus:border-black" placeholder="••••••••••••"/></label>
                {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">{error}</div>}
                <button type="submit" disabled={loading} className="w-full rounded-xl bg-black py-3.5 font-bold text-white hover:bg-zinc-800 disabled:opacity-50">{loading ? "Checking account..." : "Continue securely"}</button>
              </form>
            ) : (
              <form onSubmit={handleOtp} className="mt-7 space-y-5">
                <label className="block text-sm font-bold">Verification code<input inputMode="numeric" autoComplete="one-time-code" value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,"").slice(0,6))} required minLength={6} maxLength={6} autoFocus className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-4 text-center text-2xl font-black tracking-[.35em] outline-none focus:border-black" placeholder="000000"/></label>
                {notice && <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800">{notice}</div>}
                {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">{error}</div>}
                <button type="submit" disabled={loading || code.length !== 6} className="w-full rounded-xl bg-black py-3.5 font-bold text-white hover:bg-zinc-800 disabled:opacity-50">{loading ? "Verifying..." : "Verify and open dashboard"}</button>
                <button type="button" disabled={resending} onClick={resendCode} className="w-full flex items-center justify-center gap-2 text-sm font-bold text-zinc-600 hover:text-black disabled:opacity-50"><RefreshCw size={15}/>{resending ? "Sending new code..." : "Resend verification code"}</button>
                <button type="button" onClick={backToCredentials} className="w-full flex items-center justify-center gap-2 text-sm font-bold text-zinc-500 hover:text-black"><ArrowLeft size={15}/> Back to sign in</button>
              </form>
            )}
          </div>
          <p className="mt-5 text-center text-xs text-zinc-400">Dashboard access is private, non-indexable and logged for security.</p>
        </div>
      </section>
    </div>
  );
}
