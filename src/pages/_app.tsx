// src/pages/_app.tsx
import { WagmiConfig, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { createPublicClient, http } from 'viem';
import 'tailwindcss/tailwind.css';

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: base,
    transport: http()
  }),
  connectors: [new InjectedConnector({ chains: [base] })]
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}