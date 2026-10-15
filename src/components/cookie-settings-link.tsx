"use client";

/** Footer control that reopens the consent banner so any visitor can change or withdraw their choice. */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
    >
      Cookie settings
    </button>
  );
}
