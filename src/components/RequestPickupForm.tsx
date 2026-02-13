"use client";

import { useEffect, useId, useMemo, useState } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabaseBrowserClient";

type ScrapTypeOption = { id: string; name: string };

type PickupApiBody = {
  address: string;
  timeSlot: string;
  latitude?: number;
  longitude?: number;
  items: Array<{ scrapTypeId: string; estimatedQuantity: number }>;
};

type ApiSuccess = { success: true; pickupId: string };
type ApiError = { success: false; error: string };

const FALLBACK_SCRAP_TYPES: ScrapTypeOption[] = [
  { id: "paper", name: "Paper" },
  { id: "plastic", name: "Plastic" },
  { id: "metal", name: "Metal" },
  { id: "electronics", name: "Electronics" },
  { id: "mixed", name: "Mixed" },
];

function getApiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_API_BASE ?? process.env.NEXT_PUBLIC_API_URL;
  if (!url) throw new Error("Missing NEXT_PUBLIC_API_BASE");
  return url.replace(/\/$/, "");
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

async function readJsonSafely(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

export default function RequestPickupForm({
  accessToken,
}: {
  accessToken?: string | null;
}) {
  const formId = useId();

  const [authGateOpen, setAuthGateOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [pendingBody, setPendingBody] = useState<PickupApiBody | null>(null);
  const [pendingAutoSubmit, setPendingAutoSubmit] = useState<boolean>(false);

  const [authEmail, setAuthEmail] = useState<string>("");
  const [authPassword, setAuthPassword] = useState<string>("");
  const [authStatus, setAuthStatus] = useState<"idle" | "loading">("idle");
  const [authError, setAuthError] = useState<string>("");
  const [sessionAccessToken, setSessionAccessToken] = useState<string>("");
  const [sessionEmail, setSessionEmail] = useState<string>("");

  const [scrapTypes, setScrapTypes] = useState<ScrapTypeOption[]>([]);
  const [scrapTypesLoading, setScrapTypesLoading] = useState(true);

  const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>([]);
  const [totalWeightKg, setTotalWeightKg] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("");

  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "denied" | "ready">("idle");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [successPickupId, setSuccessPickupId] = useState<string>("");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // If parent passes a token, treat as authoritative.
    if (accessToken && String(accessToken).trim()) {
      setSessionAccessToken(String(accessToken).trim());
      return;
    }

    let unsub: { data: { subscription: { unsubscribe: () => void } } } | null = null;
    let cancelled = false;

    async function initSession() {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token ?? "";
        const email = data.session?.user?.email ?? "";
        if (!cancelled) {
          setSessionAccessToken(token);
          setSessionEmail(email);
        }

        unsub = supabase.auth.onAuthStateChange((_event, session) => {
          setSessionAccessToken(session?.access_token ?? "");
          setSessionEmail(session?.user?.email ?? "");
        });
      } catch {
        // If Supabase env vars aren't configured yet, login UI will show an error on submit.
      }
    }

    initSession();
    return () => {
      cancelled = true;
      try {
        unsub?.data?.subscription?.unsubscribe();
      } catch {
        // ignore
      }
    };
  }, [accessToken]);

  useEffect(() => {
    let cancelled = false;

    async function loadTypes() {
      setScrapTypesLoading(true);
      try {
        const baseUrl = getApiBaseUrl();
        const res = await fetch(`${baseUrl}/api/scrap-types`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        const data = (await readJsonSafely(res)) as
          | { success?: boolean; types?: Array<{ id?: string; name?: string }> }
          | null;

        const fromApi = (data?.types || [])
          .map((t) => ({ id: String(t.id ?? "").trim(), name: String(t.name ?? "").trim() }))
          .filter((t) => t.id && t.name);

        if (!cancelled) {
          setScrapTypes(fromApi.length ? fromApi : FALLBACK_SCRAP_TYPES);
        }
      } catch {
        if (!cancelled) setScrapTypes(FALLBACK_SCRAP_TYPES);
      } finally {
        if (!cancelled) setScrapTypesLoading(false);
      }
    }

    loadTypes();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedCount = selectedTypeIds.length;

  const parsedWeight = useMemo(() => {
    const n = Number(totalWeightKg);
    return Number.isFinite(n) ? n : NaN;
  }, [totalWeightKg]);

  const parsedLat = useMemo(() => {
    if (!String(lat).trim()) return undefined;
    const n = Number(lat);
    return Number.isFinite(n) ? n : NaN;
  }, [lat]);

  const parsedLon = useMemo(() => {
    if (!String(lon).trim()) return undefined;
    const n = Number(lon);
    return Number.isFinite(n) ? n : NaN;
  }, [lon]);

  const estimatedPerType = useMemo(() => {
    if (!Number.isFinite(parsedWeight) || parsedWeight <= 0) return NaN;
    if (selectedCount <= 0) return NaN;
    return round2(parsedWeight / selectedCount);
  }, [parsedWeight, selectedCount]);

  function toggleType(id: string) {
    setSelectedTypeIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return [...prev, id];
    });
  }

  function validate(): PickupApiBody | null {
    return validateWithOptions({ requireToken: true });
  }

  function validateWithOptions({ requireToken }: { requireToken: boolean }): PickupApiBody | null {
    const nextErrors: Record<string, string> = {};

    if (selectedCount <= 0) {
      nextErrors.items = "Select at least one scrap type.";
    }

    if (!Number.isFinite(parsedWeight) || parsedWeight <= 0) {
      nextErrors.weight = "Enter a valid weight greater than 0.";
    }

    if (!String(address).trim()) {
      nextErrors.address = "Pickup address is required.";
    }

    if (!String(timeSlot).trim()) {
      nextErrors.timeSlot = "Please choose a time slot.";
    }

    if (parsedLat !== undefined && !isFiniteNumber(parsedLat)) {
      nextErrors.latitude = "Latitude must be a number.";
    }
    if (parsedLon !== undefined && !isFiniteNumber(parsedLon)) {
      nextErrors.longitude = "Longitude must be a number.";
    }

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return null;

    if (requireToken) {
      const token = sessionAccessToken || (accessToken ? String(accessToken).trim() : "");
      if (!token) return null;
    }

    const qty = round2(parsedWeight / selectedCount);
    const items = selectedTypeIds.map((id) => ({ scrapTypeId: id, estimatedQuantity: qty }));

    const body: PickupApiBody = {
      address: String(address).trim(),
      timeSlot: String(timeSlot).trim(),
      items,
      ...(parsedLat !== undefined ? { latitude: parsedLat } : {}),
      ...(parsedLon !== undefined ? { longitude: parsedLon } : {}),
    };

    return body;
  }

  async function submitPickupRequest(body: PickupApiBody, token: string) {
    setSubmitting(true);
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/api/pickups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = (await readJsonSafely(res)) as ApiSuccess | ApiError | null;

      if (!res.ok) {
        const message =
          (data && typeof (data as ApiError).error === "string" && (data as ApiError).error) ||
          `Request failed (${res.status})`;
        setSubmitError(message);
        return;
      }

      if (!data || (data as ApiSuccess).success !== true || typeof (data as ApiSuccess).pickupId !== "string") {
        setSubmitError("Unexpected server response.");
        return;
      }

      setSuccessPickupId((data as ApiSuccess).pickupId);
      setSelectedTypeIds([]);
      setTotalWeightKg("");
      setAddress("");
      setTimeSlot("");
      setLat("");
      setLon("");
      setGeoStatus("idle");
      setFieldErrors({});
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function maybeAutoSubmit() {
      if (submitting) return;
      if (!pendingBody || !pendingAutoSubmit) return;

      const token = sessionAccessToken || (accessToken ? String(accessToken).trim() : "");
      if (!token) return;

      setPendingAutoSubmit(false);
      setPendingBody(null);
      setAuthGateOpen(false);

      // If component unmounts mid-flight, just skip state updates.
      if (cancelled) return;

      await submitPickupRequest(pendingBody, token);
    }

    maybeAutoSubmit();
    return () => {
      cancelled = true;
    };
  }, [accessToken, pendingAutoSubmit, pendingBody, sessionAccessToken, submitting]);

  async function signInWithEmailPassword() {
    setAuthError("");
    setSuccessPickupId("");
    setSubmitError("");

    if (!String(authEmail).trim() || !String(authPassword).trim()) {
      setAuthError("Email and password are required.");
      return;
    }

    setAuthStatus("loading");
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: String(authEmail).trim(),
        password: String(authPassword),
      });
      if (error) {
        setAuthError(error.message || "Could not sign in.");
        return;
      }
      setSessionAccessToken(data.session?.access_token ?? "");
      setSessionEmail(data.session?.user?.email ?? "");
      setAuthPassword("");
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : "Could not sign in.");
    } finally {
      setAuthStatus("idle");
    }
  }

  async function signUpWithEmailPassword() {
    setAuthError("");
    setSuccessPickupId("");
    setSubmitError("");

    if (!String(authEmail).trim() || !String(authPassword).trim()) {
      setAuthError("Email and password are required.");
      return;
    }

    setAuthStatus("loading");
    try {
      const supabase = getSupabaseBrowserClient();
      const email = String(authEmail).trim();
      const password = String(authPassword);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setAuthError(error.message || "Could not create account.");
        return;
      }

      // If email confirmations are enabled, session may be null until confirmed.
      setSessionAccessToken(data.session?.access_token ?? "");
      setSessionEmail(data.user?.email ?? "");
      setAuthPassword("");

      // If email confirmations are enabled, try a sign-in anyway (some setups still allow immediate login).
      if (!data.session) {
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (loginError) {
          setAuthError("Account created. Please confirm your email, then sign in.");
          return;
        }
        setSessionAccessToken(loginData.session?.access_token ?? "");
        setSessionEmail(loginData.session?.user?.email ?? "");
      }
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : "Could not create account.");
    } finally {
      setAuthStatus("idle");
    }
  }

  async function useGeolocation() {
    setSubmitError("");
    setSuccessPickupId("");

    if (!("geolocation" in navigator)) {
      setGeoStatus("denied");
      setSubmitError("Geolocation is not supported in this browser.");
      return;
    }

    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nextLat = pos.coords.latitude;
        const nextLon = pos.coords.longitude;
        setLat(String(nextLat));
        setLon(String(nextLon));
        setGeoStatus("ready");
      },
      () => {
        setGeoStatus("denied");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    setSuccessPickupId("");

    const body = validateWithOptions({ requireToken: false });
    if (!body) return;

    const token = sessionAccessToken || (accessToken ? String(accessToken).trim() : "");
    if (!token) {
      setPendingBody(body);
      setPendingAutoSubmit(true);
      setAuthGateOpen(true);
      setAuthMode("signin");
      setSubmitError("Please sign in (or create an account) to submit your pickup request.");
      return;
    }

    await submitPickupRequest(body, token);
  }

  const isLoggedIn = !!(sessionAccessToken || (accessToken ? String(accessToken).trim() : ""));

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      aria-describedby={submitError ? `${formId}-submit-error` : undefined}
    >
      {isLoggedIn ? (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-green-50 px-4 py-3 text-sm text-green-800 ring-1 ring-green-100">
          Logged in{sessionEmail ? ` as ${sessionEmail}` : ""}.
        </div>
      ) : null}

      {!isLoggedIn && authGateOpen ? (
        <div className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="text-sm font-semibold text-slate-900">
            {authMode === "signin" ? "Sign in to continue" : "Create account to continue"}
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Your pickup request will be submitted right after you sign in.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Email" error={undefined} inputId={`${formId}-auth-email`}>
              <input
                id={`${formId}-auth-email`}
                type="email"
                autoComplete="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-sky-400"
                placeholder="you@example.com"
              />
            </Field>

            <Field label="Password" error={undefined} inputId={`${formId}-auth-password`}>
              <input
                id={`${formId}-auth-password`}
                type="password"
                autoComplete={authMode === "signin" ? "current-password" : "new-password"}
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-sky-400"
                placeholder="Your password"
              />
            </Field>
          </div>

          <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center">
            {authMode === "signin" ? (
              <button
                type="button"
                onClick={signInWithEmailPassword}
                disabled={authStatus === "loading"}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
              >
                {authStatus === "loading" ? "Signing in…" : "Sign in"}
              </button>
            ) : (
              <button
                type="button"
                onClick={signUpWithEmailPassword}
                disabled={authStatus === "loading"}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
              >
                {authStatus === "loading" ? "Creating…" : "Create account"}
              </button>
            )}

            <button
              type="button"
              onClick={() => setAuthMode((m) => (m === "signin" ? "signup" : "signin"))}
              disabled={authStatus === "loading"}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
              {authMode === "signin" ? "Create account" : "I already have an account"}
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthGateOpen(false);
                setPendingAutoSubmit(false);
              }}
              disabled={authStatus === "loading"}
              className="inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold text-slate-600 hover:text-slate-800 disabled:opacity-60 md:ml-auto"
            >
              Cancel
            </button>
          </div>

          {authError ? (
            <div role="alert" className="mt-3 rounded-xl bg-white px-4 py-3 text-sm text-slate-800 ring-1 ring-slate-200">
              {authError}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <fieldset className="md:col-span-2">
          <legend className="mb-2 text-xs font-semibold text-slate-700">Scrap types (select at least 1)</legend>
          <div className="grid gap-2 md:grid-cols-3">
            {(scrapTypesLoading ? FALLBACK_SCRAP_TYPES : scrapTypes).map((t) => {
              const checked = selectedTypeIds.includes(t.id);
              return (
                <label
                  key={t.id}
                  className={
                    "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm " +
                    (checked ? "border-sky-300 bg-sky-50" : "border-slate-200 bg-white")
                  }
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleType(t.id)}
                    className="h-4 w-4"
                    disabled={!isLoggedIn && authStatus === "loading"}
                  />
                  <span className="text-slate-900">{t.name}</span>
                </label>
              );
            })}
          </div>
          {fieldErrors.items ? (
            <p id={`${formId}-items-error`} className="mt-2 text-sm text-red-700">
              {fieldErrors.items}
            </p>
          ) : null}
        </fieldset>

        <Field label="Approx weight (kg)" error={fieldErrors.weight} inputId={`${formId}-weight`}>
          <input
            id={`${formId}-weight`}
            inputMode="decimal"
            value={totalWeightKg}
            onChange={(e) => setTotalWeightKg(e.target.value)}
            className={
              "h-11 w-full rounded-xl border px-3 text-sm outline-none focus:border-sky-400 " +
              (fieldErrors.weight ? "border-red-300" : "border-slate-200")
            }
            placeholder="e.g. 10"
            aria-invalid={fieldErrors.weight ? true : undefined}
          />
        </Field>

        <Field label="Time slot" error={fieldErrors.timeSlot} inputId={`${formId}-timeSlot`}>
          <select
            id={`${formId}-timeSlot`}
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className={
              "h-11 w-full rounded-xl border px-3 text-sm outline-none focus:border-sky-400 " +
              (fieldErrors.timeSlot ? "border-red-300" : "border-slate-200")
            }
            aria-invalid={fieldErrors.timeSlot ? true : undefined}
          >
            <option value="">Select…</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </Field>

        <div className="md:col-span-2">
          <Field label="Pickup address" error={fieldErrors.address} inputId={`${formId}-address`}>
            <textarea
              id={`${formId}-address`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={
                "min-h-[88px] w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-sky-400 " +
                (fieldErrors.address ? "border-red-300" : "border-slate-200")
              }
              placeholder="House/Flat, Street, Area, City"
              aria-invalid={fieldErrors.address ? true : undefined}
            />
          </Field>
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">Pickup location</div>
                <div className="text-xs text-slate-600">
                  Use geolocation or enter coordinates manually (optional).
                </div>
              </div>
              <button
                type="button"
                onClick={useGeolocation}
                disabled={geoStatus === "loading"}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {geoStatus === "loading" ? "Locating…" : "Use my current location"}
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Latitude (optional)" error={fieldErrors.latitude} inputId={`${formId}-lat`}>
                <input
                  id={`${formId}-lat`}
                  inputMode="decimal"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className={
                    "h-11 w-full rounded-xl border px-3 text-sm outline-none focus:border-sky-400 " +
                    (fieldErrors.latitude ? "border-red-300" : "border-slate-200")
                  }
                  placeholder="e.g. 24.8607"
                  aria-invalid={fieldErrors.latitude ? true : undefined}
                />
              </Field>

              <Field label="Longitude (optional)" error={fieldErrors.longitude} inputId={`${formId}-lon`}>
                <input
                  id={`${formId}-lon`}
                  inputMode="decimal"
                  value={lon}
                  onChange={(e) => setLon(e.target.value)}
                  className={
                    "h-11 w-full rounded-xl border px-3 text-sm outline-none focus:border-sky-400 " +
                    (fieldErrors.longitude ? "border-red-300" : "border-slate-200")
                  }
                  placeholder="e.g. 67.0011"
                  aria-invalid={fieldErrors.longitude ? true : undefined}
                />
              </Field>
            </div>

            {geoStatus === "denied" ? (
              <p className="text-xs text-slate-600">Geolocation was denied — you can still type coordinates manually.</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="text-xs font-semibold text-slate-700">Preview</div>
        <div className="mt-1 text-sm text-slate-900">
          {selectedCount > 0 && Number.isFinite(estimatedPerType) ? (
            <span>
              {selectedCount} type{selectedCount === 1 ? "" : "s"} selected • Estimated quantity per type: {estimatedPerType} kg
            </span>
          ) : (
            <span>Select scrap types and enter weight.</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-green-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit pickup request"}
      </button>

      {submitError ? (
        <div
          id={`${formId}-submit-error`}
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100"
        >
          {submitError}
        </div>
      ) : null}

      {successPickupId ? (
        <div
          role="status"
          className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700 ring-1 ring-green-100"
        >
          Request submitted. Your pickup ID is <span className="font-mono">{successPickupId}</span>.
        </div>
      ) : null}
    </form>
  );
}

function Field({
  label,
  error,
  inputId,
  children,
}: {
  label: string;
  error?: string;
  inputId: string;
  children: React.ReactNode;
}) {
  const describedBy = error ? `${inputId}-error` : undefined;

  return (
    <label className="block" htmlFor={inputId}>
      <div className="mb-1 text-xs font-semibold text-slate-700">{label}</div>
      <div aria-describedby={describedBy}>{children}</div>
      {error ? (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </label>
  );
}
