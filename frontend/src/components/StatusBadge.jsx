import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ShieldAlert } from 'lucide-react';

export default function StatusBadge({ riskLevel, status }) {
  const isLow = riskLevel?.toLowerCase().includes('low');
  const isMedium = riskLevel?.toLowerCase().includes('medium') || riskLevel?.toLowerCase().includes('moderate');
  
  if (isLow) {
    return (
      <span className="badge badge-low-risk">
        <CheckCircle2 size={13} />
        <span>Low Risk • {status || 'Viable'}</span>
      </span>
    );
  }
  
  if (isMedium) {
    return (
      <span className="badge badge-medium-risk">
        <AlertTriangle size={13} />
        <span>Moderate Risk • {status || 'Conditional'}</span>
      </span>
    );
  }

  return (
    <span className="badge badge-high-risk">
      <ShieldAlert size={13} />
      <span>High Risk • {status || 'Unfavorable'}</span>
    </span>
  );
}
