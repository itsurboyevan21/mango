import Script from "next/script";

export default function Home() {
  return (
    <main className="stage">
      <div className="device" id="device">
        <div id="app" className="app" aria-live="polite">
          <noscript>mango · share vividly — please enable JavaScript to continue.</noscript>
        </div>
      </div>
      <Script src="/mango/app.js" strategy="afterInteractive" />
    </main>
  );
}
