import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { getReportData } from "@/lib/manager/data";
import { formatInr } from "@/lib/manager/format";
import { requireManager } from "../_shared";

export async function GET(request: NextRequest) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  const period = (request.nextUrl.searchParams.get("period") || "monthly") as "daily" | "monthly" | "yearly";
  const format = request.nextUrl.searchParams.get("format") || "excel";
  const report = await getReportData(period);

  if (format === "pdf") {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Aamdar Fitness Club ${period} Report`, 14, 18);
    doc.setFontSize(11);
    doc.text(`Revenue: ${formatInr(report.summary.revenue)}`, 14, 32);
    doc.text(`Expenses: ${formatInr(report.summary.expenses)}`, 14, 40);
    doc.text(`Profit: ${formatInr(report.summary.profit)}`, 14, 48);
    doc.text(`Payments: ${report.summary.payments}`, 14, 56);
    doc.text(`New Members: ${report.summary.newMembers}`, 14, 64);
    doc.text(`Leads: ${report.summary.leads}`, 14, 72);

    let y = 88;
    doc.text("Recent Payments", 14, y);
    y += 8;
    for (const payment of report.payments.slice(0, 20)) {
      doc.text(`${payment.date}  ${payment.member}  ${formatInr(payment.amount)}  ${payment.status}`, 14, y);
      y += 7;
    }

    const pdf = Buffer.from(doc.output("arraybuffer"));
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="aamdar-${period}-report.pdf"`,
      },
    });
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([report.summary]), "Summary");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(report.payments), "Payments");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(report.expenses), "Expenses");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(report.members), "Members");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(report.attendances), "Attendance");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(report.trainers), "Trainers");
  const excel = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(excel, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="aamdar-${period}-report.xlsx"`,
    },
  });
}
