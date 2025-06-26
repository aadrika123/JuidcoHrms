import { useEffect, useState } from "react";

interface CaptchaHook {
  captchaInputField: (props: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => JSX.Element;
  captcha: string;
  captchaImage: string;
  verifyCaptcha: (userInput: string) => boolean;
  generateRandomCaptcha: () => void;
}

const useCaptchaGenerator = (): CaptchaHook => {
  const [captcha, setCaptcha] = useState<string>("");
  const [captchaImage, setCaptchaImage] = useState<string>("");

  const generateRandomCaptcha = () => {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const captchaText = Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");

    setCaptcha(captchaText);
    drawCaptcha(captchaText);
  };

  const drawCaptcha = (captchaText: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 70;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Background
    ctx.fillStyle = "#E3F2FD";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Noise
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.bezierCurveTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
      ctx.strokeStyle = `rgba(0, 0, 0, 0.3)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Text
    ctx.font = "bold 30px Arial";
    for (let i = 0; i < captchaText.length; i++) {
      ctx.save();
      const x = 20 + i * 30;
      const y = 40 + Math.random() * 10;
      const angle = (Math.random() - 0.5) * 0.6;
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.9 + 0.1})`;
      ctx.fillText(captchaText[i], 0, 0);
      ctx.restore();
    }

    setCaptchaImage(canvas.toDataURL());
  };

  const verifyCaptcha = (userInput: string): boolean => {
    const isValid = userInput === captcha;
    if (!isValid) generateRandomCaptcha();
    return isValid;
  };

  const captchaInputField = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }): JSX.Element => (
    <input
      type="text"
      value={value}
      onChange={onChange}
      autoComplete="off"
      spellCheck={false}
      className="w-full p-2 border rounded"
      onPaste={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      placeholder="Enter Captcha"
    />
  );

  useEffect(() => {
    generateRandomCaptcha();
  }, []);

  return {
    captchaInputField,
    captcha,
    captchaImage,
    verifyCaptcha,
    generateRandomCaptcha,
  };
};

export default useCaptchaGenerator;
