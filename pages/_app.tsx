import type { AppProps } from "next/app";
import { WalletContextProvider } from "../contexts/ContextProvider";
import { ThirdwebProvider } from '@thirdweb-dev/react/solana'; 
import { Network } from '@thirdweb-dev/sdk/solana'; 
import "../styles/globals.css";

const network: Network = "devnet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider endpoint={network}>
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
