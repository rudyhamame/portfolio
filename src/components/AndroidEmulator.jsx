import { useState } from 'react'

// Embeds a self-hosted ws-scrcpy stream (an Android emulator on the machine
// serving this site). ws-scrcpy draws its own phone bezel + controls. Falls
// back to the APK download when there's no stream URL.
export default function AndroidEmulator({ android }) {
  const { apkUrl, liveUrl } = android || {}
  const [started, setStarted] = useState(false)
  const streamUrl = liveUrl ? new URL(liveUrl) : null
  streamUrl?.searchParams.set('portfolio', '1')

  return (
    <div className="emulator">
      {started && streamUrl ? (
        <div
          className="emulator__live"
          role="group"
          aria-label="Android phone and controls"
        >
          <iframe
            className="emulator__iframe"
            title="Android app running live"
            src={streamUrl.href}
            allow="autoplay; fullscreen; clipboard-write"
          />
        </div>
      ) : liveUrl ? (
        <button
          type="button"
          className="btn btn--primary emulator__launch"
          onClick={() => setStarted(true)}
        >
          ▶ Launch the app
        </button>
      ) : (
        <p className="emulator__placeholder">
          The interactive demo is only live when the demo server is running.
          Download the APK below to try the app.
        </p>
      )}
      {apkUrl && (
        <a className="btn emulator__download" href={apkUrl} download>
          Download the APK
        </a>
      )}
    </div>
  )
}
