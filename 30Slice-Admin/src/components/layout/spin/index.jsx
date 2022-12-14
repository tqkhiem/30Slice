import React from 'react';

export default function Spin() {
  return (
    <div id="overlayer">
      <span className="loader-overlay">
        <div className="atbd-spin-dots spin-lg">
          <span className="spin-dot badge-dot dot-primary" />
          <span className="spin-dot badge-dot dot-primary" />
          <span className="spin-dot badge-dot dot-primary" />
          <span className="spin-dot badge-dot dot-primary" />
        </div>
      </span>
    </div>
  );
}
