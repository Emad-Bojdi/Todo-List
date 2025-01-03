import '../styles/globals.css';
import Layout from "../components/layout/Layout"
import { SessionProvider } from "next-auth/react";
const App = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default App;