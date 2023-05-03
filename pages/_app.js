import { AuthProvider } from "../context/auth";
import { DomainProvider } from "../context/domain";
import { AppProvider } from "../context/app";
import "../styles/globals.css";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <DomainProvider>
        <AuthProvider>
          <Nav />
          <Component {...pageProps} />
        </AuthProvider>
      </DomainProvider>
    </AppProvider>
  );
}

export default MyApp;
