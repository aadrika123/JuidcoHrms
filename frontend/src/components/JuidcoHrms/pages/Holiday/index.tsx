"use client"

import { useState, useEffect } from "react"
import axios from "@/lib/axiosConfig"
import { Calendar, CalendarDays, Download } from "lucide-react"
import { jsPDF } from "jspdf"
import { HRMS_URL } from "@/utils/api/urls"

interface Holiday {
  id: number
  date: string
  name: string
}

interface HolidayResponse {
  status: boolean
  message: string
  data: {
    totalPage: number
    data: Holiday[]
  }
}

const Holiday = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  useEffect(() => {
    fetchHolidays()
  }, [])

  const fetchHolidays = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${HRMS_URL.HOLIDAY.get}`)

      if (response.data.status) {
        setHolidays(response.data.data.data)
      } else {
        setError("Failed to fetch holidays")
      }
    } catch (err) {
      console.error("Error fetching holidays:", err)
      setError("Error fetching holidays")
    } finally {
      setLoading(false)
    }
  }

  const getHolidaysForMonth = (month: number, year: number) => {
    return holidays.filter((holiday) => {
      const holidayDate = new Date(holiday.date)
      return holidayDate.getMonth() === month && holidayDate.getFullYear() === year
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const generateCalendarDays = () => {
    const firstDay = new Date(selectedYear, selectedMonth, 1)
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const monthHolidays = getHolidaysForMonth(selectedMonth, selectedYear)

    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)

      const isCurrentMonth = currentDate.getMonth() === selectedMonth
      const holiday = monthHolidays.find((h) => new Date(h.date).toDateString() === currentDate.toDateString())

      days.push({
        date: currentDate,
        isCurrentMonth,
        holiday,
      })
    }

    return days
  }

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true)

      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Title with background
      pdf.setFillColor(67, 56, 202) // Blue background
      pdf.rect(0, 0, pageWidth, 30, "F")

      pdf.setTextColor(255, 255, 255) // White text
      pdf.setFontSize(24)
      pdf.setFont("helvetica", "bold")
      pdf.text("Holiday Calendar 2025", pageWidth / 2, 20, { align: "center" })

      // Reset text color
      pdf.setTextColor(0, 0, 0)

      let yPosition = 45

      // Table headers
      const headers = ["S.No", "Date", "Day", "Holiday Name", "Month"]
      const columnWidths = [15, 25, 25, 80, 25]
      const startX = 20

      // Header background
      pdf.setFillColor(59, 130, 246) // Blue header
      pdf.rect(
        startX,
        yPosition - 5,
        columnWidths.reduce((a, b) => a + b, 0),
        10,
        "F",
      )

      // Header text
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(10)
      pdf.setFont("helvetica", "bold")

      let currentX = startX
      headers.forEach((header, index) => {
        pdf.text(header, currentX + columnWidths[index] / 2, yPosition, { align: "center" })
        currentX += columnWidths[index]
      })

      yPosition += 15
      pdf.setTextColor(0, 0, 0)
      pdf.setFont("helvetica", "normal")

      // Sort holidays by date
      const sortedHolidays = [...holidays].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      // Table rows
      sortedHolidays.forEach((holiday, index) => {
        const holidayDate = new Date(holiday.date)
        const dayName = holidayDate.toLocaleDateString("en-US", { weekday: "long" })
        const monthName = holidayDate.toLocaleDateString("en-US", { month: "long" })
        const formattedDate = holidayDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })

        // Alternating row colors
        if (index % 2 === 0) {
          pdf.setFillColor(248, 250, 252) // Light gray
          pdf.rect(
            startX,
            yPosition - 4,
            columnWidths.reduce((a, b) => a + b, 0),
            8,
            "F",
          )
        }

        // Special color for weekends
        const dayOfWeek = holidayDate.getDay()
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          // Sunday or Saturday
          pdf.setFillColor(254, 226, 226) // Light red for weekends
          pdf.rect(
            startX,
            yPosition - 4,
            columnWidths.reduce((a, b) => a + b, 0),
            8,
            "F",
          )
        }

        // Row data
        const rowData = [(index + 1).toString(), formattedDate, dayName, holiday.name, monthName]

        currentX = startX
        rowData.forEach((data, colIndex) => {
          // Adjust font size for long holiday names
          if (colIndex === 3 && data.length > 25) {
            pdf.setFontSize(8)
          } else {
            pdf.setFontSize(9)
          }

          // Center align for all columns except holiday name
          const align = colIndex === 3 ? "left" : "center"
          const textX = colIndex === 3 ? currentX + 2 : currentX + columnWidths[colIndex] / 2

          pdf.text(data, textX, yPosition, { align: align, maxWidth: columnWidths[colIndex] - 4 })
          currentX += columnWidths[colIndex]
        })

        yPosition += 8

        // Add new page if needed
        if (yPosition > pageHeight - 30) {
          pdf.addPage()
          yPosition = 20

          // Repeat headers on new page
          pdf.setFillColor(59, 130, 246)
          pdf.rect(
            startX,
            yPosition - 5,
            columnWidths.reduce((a, b) => a + b, 0),
            10,
            "F",
          )

          pdf.setTextColor(255, 255, 255)
          pdf.setFontSize(10)
          pdf.setFont("helvetica", "bold")

          currentX = startX
          headers.forEach((header, index) => {
            pdf.text(header, currentX + columnWidths[index] / 2, yPosition, { align: "center" })
            currentX += columnWidths[index]
          })

          yPosition += 15
          pdf.setTextColor(0, 0, 0)
          pdf.setFont("helvetica", "normal")
        }
      })

      // Add footer with summary
      const finalY = Math.min(yPosition + 20, pageHeight - 20)

      // Summary box
      pdf.setFillColor(34, 197, 94) // Green background
      pdf.rect(
        startX,
        finalY - 5,
        columnWidths.reduce((a, b) => a + b, 0),
        15,
        "F",
      )

      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(12)
      pdf.setFont("helvetica", "bold")
      pdf.text(`Total Holidays: ${holidays.length}`, pageWidth / 2, finalY + 5, { align: "center" })

      // Add legend
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(8)
      pdf.text("Legend:", startX, finalY + 20)

      // Weekend legend
      pdf.setFillColor(254, 226, 226)
      pdf.rect(startX + 20, finalY + 17, 5, 3, "F")
      pdf.text("Weekend Holidays", startX + 28, finalY + 20)

      // Regular legend
      pdf.setFillColor(248, 250, 252)
      pdf.rect(startX + 80, finalY + 17, 5, 3, "F")
      pdf.text("Regular Holidays", startX + 88, finalY + 20)

      pdf.save("Holiday_Calendar_2025_Table.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto my-8 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto my-8 p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button onClick={fetchHolidays} className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Retry
          </button>
        </div>
      </div>
    )
  }

  const calendarDays = generateCalendarDays()
  const monthHolidays = getHolidaysForMonth(selectedMonth, selectedYear)

  return (
    <div className="max-w-full mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="h-8 w-8 text-blue-600" />
          Holiday Calendar 2025
        </h1>
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Download className="h-4 w-4" />
          {isDownloading ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-4 border-b">
              <button
                onClick={() => {
                  if (selectedMonth === 0) {
                    setSelectedMonth(11)
                    setSelectedYear(selectedYear - 1)
                  } else {
                    setSelectedMonth(selectedMonth - 1)
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded"
              >
                ←
              </button>

              <h2 className="text-xl font-semibold">
                {months[selectedMonth]} {selectedYear}
              </h2>

              <button
                onClick={() => {
                  if (selectedMonth === 11) {
                    setSelectedMonth(0)
                    setSelectedYear(selectedYear + 1)
                  } else {
                    setSelectedMonth(selectedMonth + 1)
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded"
              >
                →
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-center font-semibold text-gray-600 text-sm">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`
                      p-2 text-center text-sm min-h-[40px] flex flex-col justify-center
                      ${day.isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                      ${day.holiday ? "bg-red-100 border border-red-300 rounded" : "hover:bg-gray-50"}
                    `}
                  >
                    <span className="font-medium">{day.date.getDate()}</span>
                    {day.holiday && (
                      <span className="text-xs text-red-600 font-medium truncate">{day.holiday.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Holiday List */}
        <div className="space-y-4">
          <div className="bg-white border rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-blue-600" />
                {months[selectedMonth]} Holidays
              </h3>
            </div>

            <div className="p-4">
              {monthHolidays.length > 0 ? (
                <div className="space-y-3">
                  {monthHolidays.map((holiday) => (
                    <div
                      key={holiday.id}
                      className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {new Date(holiday.date).getDate()}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{holiday.name}</h4>
                        <p className="text-sm text-gray-600">{formatDate(holiday.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No holidays this month</p>
              )}
            </div>
          </div>

          {/* Total Holidays Count */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{holidays.length}</div>
              <div className="text-sm text-blue-800">Total Holidays in 2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Holiday
