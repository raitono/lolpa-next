import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <div className="row">
        <div className="column"></div>
        <div className="column"><Component {...pageProps} /></div>
        <div className="column"></div>
      </div>
    </div>
  );
}
export default MyApp
