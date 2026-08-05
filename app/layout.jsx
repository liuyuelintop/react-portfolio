import PropTypes from "prop-types";
import "../src/index.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  themeColor: "#09090b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" itemScope itemType="https://schema.org/Person">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          media="all"
        />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body className="theme-default">
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
