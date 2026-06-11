import ToolShell from '../components/ToolShell'

export default function Privacy() {
  return (
    <ToolShell title="Privacy Policy" description="Last updated: June 2026">
      <div className="max-w-2xl space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>

        <section>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Overview</h2>
          <p>
            OneDevKit ("we", "our", "the site") is a free, browser-based developer toolkit available at{' '}
            <span style={{ color: 'var(--text-primary)' }}>onedevskit.vercel.app</span>. We are committed to
            protecting your privacy. This policy explains what data is collected and how it is used.
          </p>
        </section>

        <section>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Data We Do Not Collect</h2>
          <p>
            All tools on OneDevKit run entirely in your browser. We do <strong>not</strong> collect, store, or
            transmit any data you enter into the tools (JSON, code, text, URLs, etc.). No account or login is
            required.
          </p>
        </section>

        <section>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Analytics</h2>
          <p>
            We use <strong>Google Analytics (GA4)</strong> to understand aggregate usage patterns (e.g., which
            tools are popular, page views, country-level traffic). Google Analytics collects anonymised data
            such as browser type, device type, and pages visited. No personally identifiable information is
            collected by us. You can opt out via the{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Advertising</h2>
          <p>
            We use <strong>Google AdSense</strong> to display advertisements. Google may use cookies to serve
            ads based on your prior visits to this or other websites. You can opt out of personalised
            advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 underline"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Cookies</h2>
          <p>
            OneDevKit stores your theme preference (light/dark) in <code style={{ color: 'var(--text-primary)' }}>localStorage</code> on
            your device. No tracking cookies are set by us. Third-party services (Google Analytics, AdSense)
            may set their own cookies as described in their respective privacy policies.
          </p>
        </section>

        <section>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Third-Party APIs</h2>
          <p>
            Some tools make requests to free third-party APIs (e.g., IP geolocation, currency exchange rates).
            These requests are made directly from your browser. Please refer to the respective service's
            privacy policy for details.
          </p>
        </section>

        <section>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Continued use of the site after changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Contact</h2>
          <p>
            For any privacy-related questions, you can reach us via the contact link on this site.
          </p>
        </section>

      </div>
    </ToolShell>
  )
}
