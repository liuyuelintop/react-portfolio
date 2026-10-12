import PropTypes from "prop-types";
import "../src/index.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  themeColor: "#eeebf3",
};

// Restores a visitor's night choice before first paint. Day is the default,
// so a first visit never runs anything but the read.
const RESTORE_LIGHT = `try{if(localStorage.getItem("portfolio-light")==="night")document.documentElement.dataset.light="night"}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    // The inline script may set data-light before React hydrates.
    <html lang="en" data-light="day" itemScope itemType="https://schema.org/Person" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: RESTORE_LIGHT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..600&family=Schibsted+Grotesk:wght@400;500;600&display=swap"
          media="all"
        />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body>
        <noscript>
          <style>{`
            [style*="opacity:0"], [style*="opacity: 0"] {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
