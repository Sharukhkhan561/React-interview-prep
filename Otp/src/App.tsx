
import React from "react";
import OTPInput from "./components/OTPInput";

function App() {
  const handleVerify = async (otp: string) => {
    console.log("Verifying OTP:", otp);

    // Replace with your actual verification API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (otp !== "123456") {
      throw new Error("Invalid OTP");
    }

    alert("OTP verified successfully!");
  };

  const handleResend = async () => {
    console.log("Resending OTP...");

    // Replace with your actual resend API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("New OTP sent successfully!");
  };

  return (
    <OTPInput
      length={6}
      resendDelay={30}
      onVerify={handleVerify}
      onResend={handleResend}
    />
  );
}

export default App;
