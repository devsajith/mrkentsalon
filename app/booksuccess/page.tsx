import Link from "next/link";

export default async function BookingSuccess({
  searchParams,
}: {
  searchParams: Promise<{
    reference: string;
    customer: string;
    service: string;
    date: string;
    time: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <main className="mobile-container min-h-dvh bg-white flex flex-col items-center justify-center px-6">
      {/* Success Animation Circle */}
      <div className="animate-scale-in animate-delay-100">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
          style={{ background: "var(--accent-gradient)" }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-text-primary animate-slide-up animate-delay-200">
        Booking Confirmed!
      </h1>
      <p className="text-text-secondary text-sm mt-2 text-center animate-slide-up animate-delay-300">
        Your appointment has been successfully booked
      </p>

      {/* Details Card */}
      <div
        className="w-full max-w-md mt-8 rounded-2xl p-5 animate-slide-up animate-delay-400"
        style={{
          background: "var(--surface)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Reference */}
        <div className="flex items-center gap-3 pb-4 border-b border-border-light">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E8642C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M9 9h6M9 13h4" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">
              Reference
            </p>
            <p className="text-sm font-bold text-text-primary mt-0.5">
              {params.reference}
            </p>
          </div>
        </div>

        {/* Customer */}
        <div className="flex items-center gap-3 py-4 border-b border-border-light">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E8642C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">
              Customer
            </p>
            <p className="text-sm font-bold text-text-primary mt-0.5">
              {params.customer}
            </p>
          </div>
        </div>

        {/* Service */}
        <div className="flex items-center gap-3 py-4 border-b border-border-light">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E8642C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94L6.73 20.18a2.12 2.12 0 01-3-3l6.77-6.77a6 6 0 017.94-7.94l-3.74 3.73z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">
              Service
            </p>
            <p className="text-sm font-bold text-text-primary mt-0.5">
              {params.service}
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-3 py-4 border-b border-border-light">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E8642C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">
              Date
            </p>
            <p className="text-sm font-bold text-text-primary mt-0.5">
              {params.date}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-3 pt-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E8642C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">
              Time
            </p>
            <p className="text-sm font-bold text-text-primary mt-0.5">
              {params.time}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-md mt-8 space-y-3 animate-slide-up animate-delay-500">
        <Link href="/" className="block tap-effect">
          <div
            className="flex items-center justify-center gap-2 h-14 rounded-full text-white font-semibold text-base"
            style={{ background: "var(--accent-gradient)" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </div>
        </Link>

        <Link href="/book" className="block tap-effect">
          <div className="flex items-center justify-center gap-2 h-14 rounded-full text-accent font-semibold text-base border-2 border-accent/20 bg-accent/5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4" />
            </svg>
            Book Another
          </div>
        </Link>
      </div>
    </main>
  );
}