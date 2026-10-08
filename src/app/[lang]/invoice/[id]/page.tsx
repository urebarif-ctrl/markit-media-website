import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import { notFound } from "next/navigation";

interface InvItem {
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id: number;
  invoice_number: string;
  client_name: string;
  client_email: string;
  client_company: string;
  client_address: string;
  items: InvItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  currency: string;
  status: string;
  due_date: string | null;
  notes: string;
  created_at: string;
}

function loadInvoice(id: string): Invoice | null {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM invoices WHERE id = ?")
    .get(Number(id)) as Record<string, unknown> | undefined;
  if (!row) return null;
  return {
    ...row,
    items: JSON.parse(String(row.items || "[]")),
  } as unknown as Invoice;
}

function fmt(currency: string, amount: number) {
  return `${currency} ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const inv = loadInvoice(id);
  if (!inv) return { title: "Invoice Not Found" };
  return {
    title: `Invoice ${inv.invoice_number} — ${inv.client_company || inv.client_name}`,
    robots: { index: false, follow: false },
  };
}

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inv = loadInvoice(id);
  if (!inv) notFound();

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              nav, footer, header,
              .back-to-top, .cookie-consent,
              [aria-label="Chat with Markit Media on WhatsApp"],
              a[href*="wa.me"],
              .sr-only { display: none !important; }
              body { min-height: auto !important; }
              main { padding: 0 !important; }
              @page { margin: 16mm 12mm; size: A4; }
            }
          `,
        }}
      />

      <div className="max-w-[800px] mx-auto px-6 py-12 print:px-0 print:py-0 bg-white text-black font-[family-name:var(--font-body)]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-black pb-8 mb-8">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-black.png"
              alt="Markit Media"
              className="h-10 w-auto mb-4"
            />
            <p className="text-xs text-zinc-500 leading-relaxed">
              Markit Media
              <br />
              Full-Stack Digital Marketing Agency
              <br />
              hello@themarkitmedia.com
            </p>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-extrabold tracking-tight">INVOICE</h1>
            <p className="text-sm font-bold mt-2">{inv.invoice_number}</p>
            <div className="mt-3 text-xs text-zinc-500 space-y-0.5">
              <p>
                <span className="font-semibold text-zinc-700">Date:</span>{" "}
                {fmtDate(inv.created_at)}
              </p>
              {inv.due_date && (
                <p>
                  <span className="font-semibold text-zinc-700">Due:</span>{" "}
                  {fmtDate(inv.due_date)}
                </p>
              )}
              <p>
                <span className="font-semibold text-zinc-700">Status:</span>{" "}
                <span className="uppercase">{inv.status}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Client info */}
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[.2em] text-zinc-400 mb-2">
            Bill to
          </p>
          <p className="font-bold text-sm">{inv.client_name}</p>
          {inv.client_company && (
            <p className="text-sm text-zinc-600">{inv.client_company}</p>
          )}
          {inv.client_address && (
            <p className="text-sm text-zinc-500 whitespace-pre-line mt-1">
              {inv.client_address}
            </p>
          )}
          {inv.client_email && (
            <p className="text-sm text-zinc-500 mt-1">{inv.client_email}</p>
          )}
        </div>

        {/* Line items */}
        <table className="w-full text-sm border-collapse mb-8">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-3 font-bold">Description</th>
              <th className="text-center py-3 font-bold w-16">Qty</th>
              <th className="text-right py-3 font-bold w-28">Rate</th>
              <th className="text-right py-3 font-bold w-28">Amount</th>
            </tr>
          </thead>
          <tbody>
            {inv.items.map((item, i) => (
              <tr key={i} className="border-b border-zinc-200">
                <td className="py-3">{item.description}</td>
                <td className="py-3 text-center">{item.qty}</td>
                <td className="py-3 text-right">
                  {fmt(inv.currency, item.rate)}
                </td>
                <td className="py-3 text-right font-medium">
                  {fmt(inv.currency, item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-10">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-medium">
                {fmt(inv.currency, inv.subtotal)}
              </span>
            </div>
            {inv.tax_rate > 0 && (
              <div className="flex justify-between">
                <span className="text-zinc-500">Tax ({inv.tax_rate}%)</span>
                <span className="font-medium">
                  {fmt(inv.currency, inv.tax_amount)}
                </span>
              </div>
            )}
            <div className="flex justify-between border-t-2 border-black pt-2">
              <span className="font-extrabold text-base">Total</span>
              <span className="font-extrabold text-base">
                {fmt(inv.currency, inv.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {inv.notes && (
          <div className="border-t border-zinc-200 pt-6 mb-8">
            <p className="text-[10px] uppercase tracking-[.2em] text-zinc-400 mb-2">
              Notes
            </p>
            <p className="text-sm text-zinc-600 whitespace-pre-line">
              {inv.notes}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-zinc-200 pt-8 text-center">
          <p className="text-sm font-semibold text-zinc-700">
            Thank you for your business
          </p>
          <p className="text-xs text-zinc-400 mt-2">
            Markit Media &middot; themarkitmedia.com
          </p>
        </div>
      </div>
    </>
  );
}
