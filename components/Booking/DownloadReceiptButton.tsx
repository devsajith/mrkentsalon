"use client";

import React, { useEffect, useRef } from "react";

export default function DownloadReceiptButton({
  reference,
  customer,
  service,
  date,
  time,
  type,
}: {
  reference: string;
  customer: string;
  service: string;
  date: string;
  time: string;
  type?: string;
}) {
  const downloadedRef = useRef(false);

  const generateAndDownload = () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 700;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Premium Dark Background Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, 700);
      grad.addColorStop(0, "#18181b"); // zinc-900
      grad.addColorStop(1, "#09090b"); // zinc-950
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 700);

      // Gold/Orange Border Accent
      ctx.strokeStyle = "#e8642c";
      ctx.lineWidth = 8;
      ctx.strokeRect(4, 4, 592, 692);

      // Subtle Background Watermark (Scissors)
      ctx.strokeStyle = "rgba(232, 100, 44, 0.05)";
      ctx.lineWidth = 6;
      // Loops
      ctx.beginPath();
      ctx.arc(250, 400, 40, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(350, 400, 40, 0, Math.PI * 2);
      ctx.stroke();
      // Blades
      ctx.beginPath();
      ctx.moveTo(260, 365);
      ctx.lineTo(380, 200);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(340, 365);
      ctx.lineTo(220, 200);
      ctx.stroke();

      // Header Brand Title
      ctx.fillStyle = "#e8642c";
      ctx.font = "bold 32px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("MR.KENT BARBERS", 300, 80);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("APPOINTMENT CONFIRMATION RECEIPT", 300, 115);

      // Dashed separator line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(50, 140);
      ctx.lineTo(550, 140);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // Booking Details Rows
      const startX = 80;
      let currentY = 210;

      const drawDetailRow = (label: string, value: string, isAccent = false) => {
        ctx.textAlign = "left";
        ctx.fillStyle = "#a1a1aa"; // zinc-400
        ctx.font = "bold 13px sans-serif";
        ctx.fillText(label.toUpperCase(), startX, currentY);

        ctx.textAlign = "right";
        ctx.fillStyle = isAccent ? "#e8642c" : "#ffffff";
        ctx.font = "bold 16px sans-serif";
        ctx.fillText(value, 520, currentY);

        currentY += 55;
      };

      drawDetailRow("Customer", customer);
      drawDetailRow("Service", service);

      if (type) {
        const rawTier = type.replace("emergency_", "");
        const isEmergency = type.startsWith("emergency");
        const formattedType = rawTier.charAt(0).toUpperCase() + rawTier.slice(1) + (isEmergency ? " (Emergency)" : "");
        drawDetailRow("Service Type", formattedType, true);
      }

      drawDetailRow("Date", date);
      drawDetailRow("Time", time);
      drawDetailRow("Reference", reference, true);

      // Bottom separator
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.beginPath();
      ctx.moveTo(50, currentY);
      ctx.lineTo(550, currentY);
      ctx.stroke();

      // Mock Barcode
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(150, currentY + 30, 300, 45);
      
      // Draw stripes inside barcode
      ctx.fillStyle = "#000000";
      let barcodeX = 160;
      while (barcodeX < 440) {
        const barWidth = Math.floor(Math.random() * 4) + 1;
        ctx.fillRect(barcodeX, currentY + 30, barWidth, 45);
        barcodeX += barWidth + Math.floor(Math.random() * 3) + 1;
      }

      // Barcode Code Text
      ctx.fillStyle = "#a1a1aa";
      ctx.textAlign = "center";
      ctx.font = "bold 15px monospace";
      ctx.fillText(reference, 300, currentY + 95);

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "italic 11px sans-serif";
      ctx.fillText("Thank you for booking with MR.KENT BARBERS!", 300, currentY + 120);

      // Generate Data URL and trigger download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `mrkent-booking-${reference}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("Failed to generate ticket image:", e);
    }
  };

  useEffect(() => {
    if (!downloadedRef.current) {
      downloadedRef.current = true;
      // Slight timeout to let the page animation play smoothly first
      const timer = setTimeout(() => {
        generateAndDownload();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <button
      onClick={generateAndDownload}
      className="flex items-center justify-center gap-2 w-full h-12 rounded-xl text-white font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
      style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
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
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </svg>
      Download Confirmation Image
    </button>
  );
}
