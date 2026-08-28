import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { OdicciBrowserFrame } from "@/components/portfolio/OdicciBrowserFrame";
import odicciLogo from "@/assets/odicci/odicci-logo-wordmark.png";
import odicciBadgeMark from "@/assets/odicci/odicci-badge-mark.svg";
import signupBg from "@/assets/odicci/signup-bg.png";
import googleG from "@/assets/odicci/google-g.svg";

/**
 * OdicciSignUp — Figma auth flows at exact 1512×982, scaled via OdicciBrowserFrame:
 *   signup → 441:81053
 *   login  → 446:81457
 */

const ACCENT = "#FF5126";
const HERO_BLUE = "#004074";
const FONT = "Poppins, ui-sans-serif, system-ui, sans-serif";

export type AuthVariant = "signup" | "login";

export function OdicciSignUp({
  variant: initialVariant = "signup",
  onBack,
}: {
  variant?: AuthVariant;
  onBack?: () => void;
}) {
  const [variant, setVariant] = useState<AuthVariant>(initialVariant);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isDark = theme === "dark";
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = variant === "login";

  useEffect(() => {
    setVariant(initialVariant);
  }, [initialVariant]);

  return (
    <OdicciBrowserFrame
      tabLabel={`odicci | ${isLogin ? "Login" : "Sign up"}`}
      url={isLogin ? "odicci.com/login" : "odicci.com/signup"}
      theme={theme}
      onToggleTheme={toggleTheme}
      canvasClassName="bg-[#E6F4FE]"
    >
      <AuthArtboard
        variant={variant}
        isDark={isDark}
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        setPassword={setPassword}
        onClose={onBack}
        onSwitchVariant={(v) => setVariant(v)}
      />
    </OdicciBrowserFrame>
  );
}

function AuthArtboard({
  variant,
  isDark,
  firstName,
  lastName,
  email,
  password,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  onClose,
  onSwitchVariant,
}: {
  variant: AuthVariant;
  isDark: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  onClose?: () => void;
  onSwitchVariant: (v: AuthVariant) => void;
}) {
  const isLogin = variant === "login";
  const heroSub = isLogin ? "#BBC2CB" : "#D0D8E2";
  const textMain = isDark ? "text-white" : "text-zinc-900";
  const cardClass = isDark
    ? "border-white bg-[rgba(0,64,116,0.05)]"
    : "border-white/80 bg-white/75";
  const inputClass = isDark
    ? "bg-white/[0.15] text-white placeholder:text-white/40 border-[rgba(208,216,226,0.1)]"
    : "bg-white/85 text-zinc-900 placeholder:text-zinc-400 border-zinc-900/10";
  const labelClass = isDark ? "text-white" : "text-zinc-800";

  return (
    <div className="relative size-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img alt="" src={signupBg} className="absolute inset-0 size-full object-cover" />
        {!isDark && <div className="absolute inset-0 bg-white/25" />}
      </div>

      <div
        className="absolute flex items-start justify-between"
        style={{
          left: "50%",
          top: "50%",
          width: 1321,
          height: 692,
          transform: "translate(-50%, calc(-50% + 7px))",
        }}
      >
        {/* LEFT — logo + hero (713px) */}
        <div className="flex w-[713px] shrink-0 flex-col items-start">
          <div className="flex w-full flex-col gap-[80px]">
            <div className="relative h-[60px] w-[123px] shrink-0 overflow-hidden">
              <img
                src={odicciLogo}
                alt="odicci"
                className="absolute left-[-61.1%] top-0 h-full w-[194.87%] max-w-none object-cover"
              />
            </div>
            <div className="flex w-full flex-col gap-[36px]">
              <p className={`text-[46px] font-medium leading-[1.2] ${textMain}`}>
                Create engaging, data-driven games that{" "}
                <span style={{ color: ACCENT }}>boost interaction</span> and{" "}
                <span style={{ color: isDark ? HERO_BLUE : "#0b5a9e" }}>brand loyalty.</span>
              </p>
              <p
                className="text-[28px] font-normal leading-[1.2]"
                style={{ color: isDark ? heroSub : "#4a6b8a" }}
              >
                Odicci is the gamification platform that helps brands turn engagement into measurable
                growth.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — auth modal */}
        <div
          className={`flex h-full shrink-0 flex-col items-center justify-center gap-6 rounded-[24px] border p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] backdrop-blur-[6px] ${
            isLogin ? "w-[488px]" : "w-[462px]"
          } ${cardClass}`}
        >
          <div className={`flex w-full flex-col items-center ${isLogin ? "" : "gap-9"}`}>
            <div className="flex w-full items-start justify-end">
              <button
                type="button"
                onClick={onClose}
                className="flex size-6 items-center justify-center text-[#828B96]"
                aria-label="Close"
              >
                <X className="size-6" strokeWidth={1.5} />
              </button>
            </div>
            {isLogin ? (
              <div className="relative h-[39.27px] w-[36px] shrink-0 overflow-hidden" aria-hidden>
                <img
                  src={odicciBadgeMark}
                  alt=""
                  className="absolute left-1/2 top-0 h-[71.27px] w-[56px] max-w-none -translate-x-1/2"
                  style={{ clipPath: "inset(0 0 45% 0)" }}
                />
              </div>
            ) : (
              <img
                src={odicciBadgeMark}
                alt=""
                className="h-[71.27px] w-[56px] object-contain"
              />
            )}
          </div>

          {isLogin ? (
            <LoginModalBody
              isDark={isDark}
              textMain={textMain}
              inputClass={inputClass}
              labelClass={labelClass}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              onSignUp={() => onSwitchVariant("signup")}
            />
          ) : (
            <SignupModalBody
              isDark={isDark}
              textMain={textMain}
              inputClass={inputClass}
              labelClass={labelClass}
              firstName={firstName}
              lastName={lastName}
              email={email}
              password={password}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setEmail={setEmail}
              setPassword={setPassword}
              onLogin={() => onSwitchVariant("login")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function LoginModalBody({
  isDark,
  textMain,
  inputClass,
  labelClass,
  email,
  password,
  setEmail,
  setPassword,
  onSignUp,
}: {
  isDark: boolean;
  textMain: string;
  inputClass: string;
  labelClass: string;
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  onSignUp: () => void;
}) {
  return (
    <>
      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-6">
        <div className="w-full text-center">
          <p className={`text-[20px] font-normal leading-[1.2] ${textMain}`}>Welcome back!</p>
          <p
            className={`text-[12px] font-normal leading-[1.2] ${isDark ? "text-white/60" : "text-zinc-500"}`}
          >
            Enter your credentials below
          </p>
        </div>

        {/* Progress dots — middle active (Figma 446:81799) */}
        <div className="flex h-2 w-14 items-center justify-between" aria-hidden>
          <span className="size-2 rounded-full bg-white/50" />
          <span className="size-2 rounded-full" style={{ background: ACCENT }} />
          <span className="size-2 rounded-full bg-white/50" />
        </div>

        <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-9">
          <div className="flex h-[73px] w-full flex-col items-center justify-between">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2.5 rounded-[64px] bg-white px-[46px] py-1.5 text-[12px] font-normal text-[#9CA2AA]"
            >
              <img src={googleG} alt="" className="size-6 shrink-0" />
              Login with Google
            </button>
            <div className="flex w-full items-center gap-2">
              <div className={`h-px flex-1 ${isDark ? "bg-white/60" : "bg-zinc-300"}`} />
              <span
                className={`shrink-0 whitespace-nowrap text-[12px] font-normal ${isDark ? "text-white/60" : "text-zinc-600"}`}
              >
                Or login
              </span>
              <div className={`h-px flex-1 ${isDark ? "bg-white/60" : "bg-zinc-300"}`} />
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <Field
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={setEmail}
              type="email"
              inputClass={inputClass}
              labelClass={labelClass}
              labelSize="text-[10px]"
              full
            />
            <Field
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={setPassword}
              type="password"
              inputClass={inputClass}
              labelClass={labelClass}
              labelSize="text-[10px]"
              full
            />
          </div>
        </div>
      </div>

      <p className="w-full text-center text-[12px] font-normal leading-[1.2]">
        <span className={isDark ? "text-white" : "text-zinc-600"}>Don&apos;t have an account? </span>
        <button
          type="button"
          onClick={onSignUp}
          className="font-normal underline"
          style={{ color: ACCENT }}
        >
          Sign up here
        </button>
      </p>
    </>
  );
}

function SignupModalBody({
  isDark,
  textMain,
  inputClass,
  labelClass,
  firstName,
  lastName,
  email,
  password,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  onLogin,
}: {
  isDark: boolean;
  textMain: string;
  inputClass: string;
  labelClass: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  onLogin: () => void;
}) {
  return (
    <>
      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-between">
        <div className="w-full text-center">
          <p className={`text-[20px] font-normal leading-[1.2] ${textMain}`}>Create your account</p>
          <p
            className={`text-[12px] font-normal leading-[1.2] ${isDark ? "text-white/60" : "text-zinc-500"}`}
          >
            Enter your credentials below
          </p>
        </div>

        <div className="flex h-[73px] w-full flex-col items-center gap-4">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2.5 rounded-[64px] bg-white px-[46px] py-1.5 text-[12px] font-normal text-[#9CA2AA]"
          >
            <img src={googleG} alt="" className="size-6 shrink-0" />
            Sign up with Google
          </button>
          <div className="flex w-full items-center gap-2">
            <div className={`h-px flex-1 ${isDark ? "bg-white" : "bg-zinc-300"}`} />
            <span
              className={`shrink-0 whitespace-nowrap text-[12px] font-normal ${isDark ? "text-white" : "text-zinc-600"}`}
            >
              Or sign up with
            </span>
            <div className={`h-px flex-1 ${isDark ? "bg-white" : "bg-zinc-300"}`} />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full gap-[13px]">
              <Field
                label="First Name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={setFirstName}
                inputClass={inputClass}
                labelClass={labelClass}
              />
              <Field
                label="Last Name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={setLastName}
                inputClass={inputClass}
                labelClass={labelClass}
              />
            </div>
            <Field
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={setEmail}
              type="email"
              inputClass={inputClass}
              labelClass={labelClass}
              full
            />
            <Field
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={setPassword}
              type="password"
              inputClass={inputClass}
              labelClass={labelClass}
              full
            />
          </div>

          <button
            type="button"
            className="inline-flex w-[266px] items-center justify-center rounded-[24px] px-[86px] py-2 text-[12px] font-normal text-white"
            style={{ background: ACCENT }}
          >
            Sign Up
          </button>
        </div>
      </div>

      <p className="h-5 w-full text-center text-[12px] font-normal leading-[1.2]">
        <span className={isDark ? "text-white" : "text-zinc-600"}>Have an account?</span>
        <span className="text-[#111927]"> </span>
        <button
          type="button"
          onClick={onLogin}
          className="font-normal underline"
          style={{ color: ACCENT }}
        >
          Login here
        </button>
      </p>
    </>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  inputClass,
  labelClass,
  labelSize = "text-[12px]",
  full,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  inputClass: string;
  labelClass: string;
  labelSize?: string;
  full?: boolean;
}) {
  return (
    <label className={`flex min-w-0 flex-col gap-2 ${full ? "w-full" : "flex-1"}`}>
      <span className={`${labelSize} font-normal leading-[1.2] ${labelClass}`}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-md border px-2.5 py-2 text-[16px] font-normal leading-[1.2] outline-none ${inputClass}`}
      />
    </label>
  );
}
