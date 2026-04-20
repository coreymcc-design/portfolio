"use client";
import React from "react";

type ButtonVariant = "terracotta" | "dark" | "sand" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  terracotta:
    "bg-terracotta text-ivory hover:bg-[#b8574a] shadow-[0px_0px_0px_1px_#ce6355] hover:shadow-[0px_0px_0px_2px_#ce6355]",
  dark:
    "bg-near-black text-[#faf9f5] border border-dark-surface hover:bg-dark-surface shadow-[0px_0px_0px_1px_#30302e]",
  sand:
    "bg-warm-sand text-charcoal-warm shadow-[0px_0px_0px_1px_#d1cfc5] hover:shadow-[0px_0px_0px_1px_#c2c0b6] hover:bg-[#dddbd0]",
  ghost:
    "bg-transparent text-olive-gray hover:text-near-black hover:bg-[#eeede5]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-[13px] px-3 py-1.5 rounded-md",
  md: "text-[14px] px-4 py-2 rounded-lg",
  lg: "text-[15px] px-5 py-2.5 rounded-lg",
};

export function Button({
  variant = "sand",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2 font-sans font-medium",
        "transition-all duration-150 cursor-pointer select-none",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
