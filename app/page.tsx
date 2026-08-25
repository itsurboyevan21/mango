import Script from "next/script";

export default function Home() {
  return (
    <main className="stage">
      <div className="device" id="device">
        <div className="status-bar" aria-hidden="true">
          <span className="status-time" id="statusTime">
            9:41
          </span>
          <div className="island">
            <span className="island-sensor" />
            <span className="island-lens" />
          </div>
          <span className="status-right">
            <svg className="cell" viewBox="0 0 18 12">
              <rect x="0" y="8" width="3" height="4" rx="0.6" fill="currentColor" />
              <rect x="5" y="5.5" width="3" height="6.5" rx="0.6" fill="currentColor" />
              <rect x="10" y="3" width="3" height="9" rx="0.6" fill="currentColor" />
              <rect x="15" y="0.5" width="3" height="11.5" rx="0.6" fill="currentColor" />
            </svg>
            <svg className="wifi" viewBox="0 0 16 12">
              <path
                d="M8 10.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zm-3.3-2.2a4.6 4.6 0 0 1 6.6 0l-1-1.1a3.1 3.1 0 0 0-4.6 0l-1 1.1zm-2.4-2.5a8 8 0 0 1 11.4 0l-1-1.1a6.6 6.6 0 0 0-9.4 0l-1 1.1z"
                fill="currentColor"
              />
            </svg>
            <span className="batt-ico">
              <b />
            </span>
          </span>
        </div>
        <div id="app" className="app" aria-live="polite" />
        <div className="home-indicator" aria-hidden="true" />
      </div>
      <p className="stage-caption">mango · share vividly</p>
      <Script src="/mango/app.js" strategy="afterInteractive" />
    </main>
  );
}
