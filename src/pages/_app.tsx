import "react-material-symbols/rounded";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <Footer />
    </>
  );
}
