"use client";

import { useEffect, useRef } from "react";
import { CONTACT_SITE_KEY } from "../data/contact-config";

declare global {
  interface Window {
    turnstile?: {
      render(container: HTMLElement, options: Record<string, unknown>): string;
      remove(id: string): void;
    };
  }
}

export default function BotVerification({ onToken, resetVersion }: { onToken: (token: string) => void; resetVersion: number }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let widget: string | undefined;
    let disposed = false;
    const render = () => {
      if (disposed || !container.current || !window.turnstile || widget) return;
      widget = window.turnstile.render(container.current, {
        sitekey: CONTACT_SITE_KEY, action: "contact", theme: "auto", size: "flexible",
        callback: onToken, "expired-callback": () => onToken(""), "error-callback": () => onToken(""),
      });
    };
    let script = document.querySelector<HTMLScriptElement>("script[data-contact-turnstile]");
    if (!script) {
      script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.dataset.contactTurnstile = "true";
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", render);
    render();
    return () => {
      disposed = true;
      script?.removeEventListener("load", render);
      if (widget && window.turnstile) window.turnstile.remove(widget);
    };
  }, [onToken, resetVersion]);
  return (
    <div className="contact-bot-verification">
      <p>Verify you’re human before sending. Temporary email addresses are not accepted.</p>
      <div ref={container} />
      <noscript>Please enable JavaScript to verify and send your message.</noscript>
    </div>
  );
}
