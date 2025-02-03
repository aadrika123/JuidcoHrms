"use client"

import React from "react" // Add this line
import Image from "next/image"
import { useState } from "react"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import imagg2 from "../../../../../public/image/Jharkhand_Calendar_2025.jpg"

const Holiday = () => {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      // Get the image container element
      const element = document.getElementById("calendar-image")
      if (!element) return

      // Create canvas from the image
      const canvas = await html2canvas(element)

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
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Jharkhand Calendar 2025</h1>

      <div id="calendar-image" className="w-full">
        <Image
          src={imagg2 || "/placeholder.svg"}
          alt="Jharkhand Calendar 2025"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg shadow-md"
          priority
        />
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                     disabled:bg-blue-400 disabled:cursor-not-allowed
                     transition-colors duration-200 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isDownloading ? "Generating PDF..." : "Download as PDF"}
        </button>
      </div>
    </div>
  )
}

export default Holiday
