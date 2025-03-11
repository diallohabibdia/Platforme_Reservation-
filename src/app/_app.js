// pages/_app.js
import { SessionProvider } from "../app/auth/session-provider"; // Importer le SessionProvider personnalisé
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
