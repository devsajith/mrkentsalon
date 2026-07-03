import Link from "next/link";
import DownloadReceiptButton from "@/components/Booking/DownloadReceiptButton";

export default async function BookingSuccess({
  searchParams,
}: {
  searchParams: Promise<{
    reference: string;
    customer: string;
    service: string;
    date: string;
    time: string;
    type?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <main className="mobile-container min-h-dvh bg-white flex flex-col items-center justify-center px-6 py-4">
      {/* Success Animation Circle */}
      <div className="animate-scale-in animate-delay-100">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
          style={{ background: "var(--accent-gradient)" }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-xl font-extrabold text-text-primary animate-slide-up animate-delay-200">
        Booking Confirmed!
      </h1>
      <p className="text-text-secondary text-xs mt-1 text-center animate-slide-up animate-delay-300">
        Your appointment has been successfully booked
      </p>

      {/* Details Card */}
      <div
        className="w-full max-w-sm mt-4 rounded-xl p-4 animate-slide-up animate-delay-400"
        style={{
          background: "var(--surface)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {/* Reference */}
        <div className="flex items-center justify-between pb-2.5 border-b border-border-light/60">
          <span className="text-xs font-semibold text-text-muted">Reference</span>
          <span className="text-xs font-extrabold text-text-primary">{params.reference}</span>
        </div>

        {/* Customer */}
        <div className="flex items-center justify-between py-2.5 border-b border-border-light/60">
          <span className="text-xs font-semibold text-text-muted">Customer</span>
          <span className="text-xs font-extrabold text-text-primary">{params.customer}</span>
        </div>

        {/* Service */}
        <div className="flex items-center justify-between py-2.5 border-b border-border-light/60">
          <span className="text-xs font-semibold text-text-muted">Service</span>
          <span className="text-xs font-extrabold text-text-primary">{params.service}</span>
        </div>

        {/* Service Type */}
        {params.type && (
          <div className="flex items-center justify-between py-2.5 border-b border-border-light/60">
            <span className="text-xs font-semibold text-text-muted">Service Type</span>
            <span className="text-xs font-extrabold text-text-primary capitalize">
              {params.type.replace("emergency_", "")} {params.type.startsWith("emergency") && "(Emergency)"}
            </span>
          </div>
        )}

        {/* Date */}
        <div className="flex items-center justify-between py-2.5 border-b border-border-light/60">
          <span className="text-xs font-semibold text-text-muted">Date</span>
          <span className="text-xs font-extrabold text-text-primary">{params.date}</span>
        </div>

        {/* Time */}
        <div className="flex items-center justify-between pt-2.5">
          <span className="text-xs font-semibold text-text-muted">Time</span>
          <span className="text-xs font-extrabold text-text-primary">{params.time}</span>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="w-full max-w-sm mt-4 p-3 bg-emerald-50 border border-emerald-200/50 rounded-xl flex items-start gap-2.5 animate-slide-up animate-delay-450">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 mt-0.5"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-emerald-800">Receipt Saved</p>
          <p className="text-[10px] text-emerald-700 font-semibold leading-relaxed">
            The booking confirmation image has been automatically saved to your gallery.
          </p>
        </div>
      </div>

      {/* Download Receipt Image Section */}
      <div className="w-full max-w-sm mt-3 animate-slide-up animate-delay-450">
        <DownloadReceiptButton
          reference={params.reference}
          customer={params.customer}
          service={params.service}
          date={params.date}
          time={params.time}
          type={params.type}
        />
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm mt-4 animate-slide-up animate-delay-500">
        <Link href="/" className="block tap-effect">
          <div
            className="flex items-center justify-center gap-2 h-12 rounded-xl text-white font-bold text-sm shadow-sm"
            style={{ background: "var(--accent-gradient)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </div>
        </Link>
      </div>
    </main>
  );
}