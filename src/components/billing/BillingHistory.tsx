import React from 'react';
import { Receipt, Download } from 'lucide-react';

interface BillingHistoryItem {
  id: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  date: string;
  invoiceUrl?: string;
}

interface BillingHistoryProps {
  history: BillingHistoryItem[];
}

export function BillingHistory({ history }: BillingHistoryProps) {
  const statusColors = {
    paid: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Receipt className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-900">Billing History</h2>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">
                  ${item.amount.toFixed(2)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
            {item.invoiceUrl && (
              <a
                href={item.invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Invoice
              </a>
            )}
          </div>
        ))}

        {history.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No billing history available
          </p>
        )}
      </div>
    </div>
  );
}