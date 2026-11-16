"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  ChevronRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { earlyAccessSchema, type EarlyAccessInput } from "@/lib/schema";

const COUNTRY_CODES = [
  { code: "+91", label: "+91" },
  { code: "+971", label: "+971" },
  { code: "+1", label: "+1" },
  { code: "+44", label: "+44" },
  { code: "+65", label: "+65" },
];

export default function EarlyAccessForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedUser, setSubmittedUser] = useState<{
    fullName: string;
    email: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EarlyAccessInput>({
    resolver: zodResolver(earlyAccessSchema),
    defaultValues: {
      fullName: "",
      email: "",
      countryCode: "+91",
      phone: "",
      website: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: EarlyAccessInput) => {
    setServerError(null);

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(
          result.error || "Unable to register right now. Please try again."
        );
        return;
      }

      setSubmittedUser({
        fullName: data.fullName,
        email: data.email,
      });
      reset();
    } catch {
      setServerError("Network error. Please check your connection.");
    }
  };

  return (
    <div className="relative z-20 mx-auto w-full max-w-[400px]">
      <AnimatePresence mode="wait">
        {submittedUser ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 text-center shadow-[0_20px_50px_-15px_rgba(6,27,58,0.12)] sm:p-7"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mx-auto mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-brand-gold-light shadow-md"
            >
              <CheckCircle2 className="h-6 w-6" />
            </motion.div>

            <h3 className="font-heading text-lg font-bold text-brand-navy sm:text-xl">
              You&apos;re on the Early Access List!
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
              Thank you,{" "}
              <span className="font-semibold text-brand-navy">
                {submittedUser.fullName}
              </span>
              . Confirmation sent to{" "}
              <span className="font-medium text-brand-gold-dark">
                {submittedUser.email}
              </span>
              .
            </p>

            <button
              type="button"
              onClick={() => setSubmittedUser(null)}
              className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-brand-navy/70 transition hover:text-brand-navy"
            >
              Register another contact →
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="lead-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-3"
          >
            {/* Hidden Anti-Spam Honeypot */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            {/* Full Name */}
            <div>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Your Full Name"
                  aria-label="Full Name"
                  disabled={isSubmitting}
                  {...register("fullName")}
                  className={`h-12 w-full rounded-2xl border bg-white pl-11 pr-4 text-base text-brand-navy shadow-[0_6px_20px_-6px_rgba(6,27,58,0.08)] placeholder:text-slate-400 transition focus:outline-none focus:ring-2 sm:text-sm ${
                    errors.fullName
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200/90 focus:border-brand-navy/40 focus:ring-brand-gold/25"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 flex items-center gap-1 pl-2 text-left text-xs text-rose-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.fullName.message}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  disabled={isSubmitting}
                  {...register("email")}
                  className={`h-12 w-full rounded-2xl border bg-white pl-11 pr-4 text-base text-brand-navy shadow-[0_6px_20px_-6px_rgba(6,27,58,0.08)] placeholder:text-slate-400 transition focus:outline-none focus:ring-2 sm:text-sm ${
                    errors.email
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200/90 focus:border-brand-navy/40 focus:ring-brand-gold/25"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 pl-2 text-left text-xs text-rose-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <div className="flex gap-2">
                <select
                  aria-label="Country code"
                  disabled={isSubmitting}
                  {...register("countryCode")}
                  className="h-12 shrink-0 rounded-2xl border border-slate-200/90 bg-white px-3 text-sm font-semibold text-brand-navy shadow-[0_6px_20px_-6px_rgba(6,27,58,0.08)] transition focus:border-brand-navy/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/25"
                >
                  {COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.label}
                    </option>
                  ))}
                </select>

                <div className="relative flex-1">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="Phone Number"
                    aria-label="Phone Number"
                    disabled={isSubmitting}
                    {...register("phone")}
                    className={`h-12 w-full rounded-2xl border bg-white pl-11 pr-4 text-base text-brand-navy shadow-[0_6px_20px_-6px_rgba(6,27,58,0.08)] placeholder:text-slate-400 transition focus:outline-none focus:ring-2 sm:text-sm ${
                      errors.phone
                        ? "border-rose-400 focus:ring-rose-200"
                        : "border-slate-200/90 focus:border-brand-navy/40 focus:ring-brand-gold/25"
                    }`}
                  />
                </div>
              </div>
              {errors.phone && (
                <p className="mt-1 flex items-center gap-1 pl-2 text-left text-xs text-rose-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.phone.message}</span>
                </p>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-left text-xs text-rose-700">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Signature Dark Navy Pill CTA Button */}
            <div className="flex justify-center pt-2">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: -1 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="group inline-flex h-[54px] w-full max-w-[248px] cursor-pointer items-center justify-between rounded-full bg-brand-navy pl-2.5 pr-6 text-sm font-semibold text-white shadow-[0_18px_32px_-8px_rgba(6,27,58,0.38)] transition hover:bg-brand-navy-light disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-navy shadow-sm transition-transform duration-200 group-hover:scale-105">
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin text-brand-gold-dark" />
                  ) : (
                    <Mail className="h-4 w-4 text-brand-navy" />
                  )}
                </span>

                <span className="flex-1 text-center tracking-wide">
                  {isSubmitting ? "Joining..." : "Get Early Access"}
                </span>

                <ChevronRight className="h-4 w-4 text-brand-gold-light transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}