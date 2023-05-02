import { AuthProvider } from "../context/auth";
import { DomainProvider } from "../context/domain";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <DomainProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </DomainProvider>
  );
}

export default MyApp;
