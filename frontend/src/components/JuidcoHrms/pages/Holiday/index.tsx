"use client"

import React, { useState, useRef } from "react"
import Image from "next/image"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import imagg2 from "../../../../../public/image/Jharkhand_Calendar_2025.jpg"

const Holiday = () => {
  const [isDownloading, setIsDownloading] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      if (!imageRef.current) return

      // Create canvas from the image
      const canvas = await html2canvas(imageRef.current, { useCORS: true })

      // Calculate dimensions to fit on A4
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4")
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight)

      // Download PDF
      pdf.save("Jharkhand_Calendar_2025.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div
      className="max-w-4xl mx-auto my-8 p-6 rounded-lg shadow-lg"
      style={{ backgroundColor: "rgb(255, 255, 255)", color: "rgb(0, 0, 0)" }} // Explicit white background
    >
      <h1
        className="text-2xl font-bold text-center mb-6"
        style={{ color: "rgb(58, 56, 56)" }} // Tailwind `primary` as RGB
      >
        Jharkhand Calendar 2025
      </h1>

      <div
        ref={imageRef}
        className="w-full p-4 rounded-lg shadow-md"
        style={{ backgroundColor: "rgb(255, 255, 255)", color: "rgb(0, 0, 0)" }}
      >
        <Image
          src={imagg2 || "/placeholder.svg"}
          alt="Jharkhand Calendar 2025"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg"
          priority
        />
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-6 py-2 rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: isDownloading ? "rgb(147, 197, 253)" : "rgb(67, 56, 202)", // `primary_blue`
            color: "rgb(255, 255, 255)",
            cursor: isDownloading ? "not-allowed" : "pointer",
          }}
        >
          {isDownloading ? "Generating PDF..." : "Download as PDF"}
        </button>
      </div>
    </div>
  )
}

export default Holiday
