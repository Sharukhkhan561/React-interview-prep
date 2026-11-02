
import React, {
    useState,
    useRef,
    useEffect,
    ChangeEvent,
    KeyboardEvent,
    ClipboardEvent,
    FormEvent,
  } from "react";
  
  import "./OTPInput.css";
  
  interface OTPInputProps {
    length?: number;
    resendDelay?: number;
    onVerify?: (otp: string) => void;
    onResend?: () => void;
  }
  
  const OTPInput: React.FC<OTPInputProps> = ({
    length = 6,
    resendDelay = 30,
    onVerify,
    onResend,
  }) => {
    const [otp, setOtp] = useState<string[]>(
      Array(length).fill("")
    );
  
    const [timeLeft, setTimeLeft] = useState(resendDelay);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState("");
  
    const inputRefs = useRef<HTMLInputElement[]>([]);
  
    // Focus first input on when component mount
    useEffect(() => {
      inputRefs.current[0]?.focus();
    }, []);
  
    // Countdown timer
    useEffect(() => {
      if (timeLeft <= 0) return;
  
      const timer = window.setTimeout(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);
  
      return () => window.clearTimeout(timer);
    }, [timeLeft]);
  
    // Update OTP digit
    const handleChange = (
      index: number,
      e: ChangeEvent<HTMLInputElement>
    ) => {
      const value = e.target.value;
  
      // Allow only numeric digits
      const digit = value.replace(/\D/g, "").slice(-1);
  
      const updatedOtp = [...otp];
      updatedOtp[index] = digit;
  
      setOtp(updatedOtp);
      setError("");
  
      // Move focus to next input
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };
  
    // Keyboard navigation
    const handleKeyDown = (
      index: number,
      e: KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace") {
        e.preventDefault();
  
        const updatedOtp = [...otp];
  
        if (updatedOtp[index]) {
          updatedOtp[index] = "";
          setOtp(updatedOtp);
        } else if (index > 0) {
          updatedOtp[index - 1] = "";
          setOtp(updatedOtp);
          inputRefs.current[index - 1]?.focus();
        }
  
        setError("");
        return;
      }
  
      if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      }
  
      if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
      }
  
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    };
  
    // Paste OTP
    const handlePaste = (
      e: ClipboardEvent<HTMLInputElement>
    ) => {
      e.preventDefault();
  
      const pastedText = e.clipboardData.getData("text");
  
      const pastedDigits = pastedText
        .replace(/\D/g, "")
        .slice(0, length);
  
      if (!pastedDigits) return;
  
      const updatedOtp = Array(length).fill("");
  
      pastedDigits.split("").forEach((digit, index) => {
        updatedOtp[index] = digit;
      });
  
      setOtp(updatedOtp);
      setError("");
  
      // Focus next empty input, or last input if complete
      const nextIndex = Math.min(pastedDigits.length, length - 1);
  
      inputRefs.current[nextIndex]?.focus();
    };
  
    // Resend OTP
    const handleResend = async () => {
      if (timeLeft > 0) return;
  
      try {
        setError("");
        setOtp(Array(length).fill(""));
  
        // Reset countdown
        setTimeLeft(resendDelay);
  
        inputRefs.current[0]?.focus();
  
        // Call resend API
        await onResend?.();
      } catch {
        setError("Unable to resend OTP. Please try again.");
        setTimeLeft(0);
      }
    };
  
    // Verify OTP
    const handleVerify = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const code = otp.join("");
  
      if (code.length !== length || isVerifying) return;
  
      try {
        setIsVerifying(true);
        setError("");
  
        await onVerify?.(code);
      } catch {
        setError("Invalid OTP. Please try again.");
      } finally {
        setIsVerifying(false);
      }
    };
  
    const isComplete = otp.every((digit) => digit !== "");
  
    return (
      <div className="otp-wrapper">
        <form className="otp-card" onSubmit={handleVerify}>
          <h2>Verify your account</h2>
  
          <p className="otp-description">
            Enter the {length}-digit verification code sent to your phone.
          </p>
  
          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  if (element) {
                    inputRefs.current[index] = element;
                  }
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                disabled={isVerifying}
                aria-label={`OTP digit ${index + 1}`}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
              />
            ))}
          </div>
  
          {error && <p className="otp-error">{error}</p>}
  
          <button
            type="submit"
            className="verify-button"
            disabled={!isComplete || isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </button>
  
          <div className="resend-container">
            <span>Didn't receive the code?</span>
  
            {timeLeft > 0 ? (
              <p className="countdown">
                Resend OTP in 00:{String(timeLeft).padStart(2, "0")}
              </p>
            ) : (
              <button
                type="button"
                className="resend-button"
                onClick={handleResend}
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };
  
  export default OTPInput;
  