"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      toastOptions={{
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-text)',
          border: 'var(--toast-border)',
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "rgb(34 197 94)",
          "--success-text": "white",
          "--error-bg": "rgb(239 68 68)",
          "--error-text": "white",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
