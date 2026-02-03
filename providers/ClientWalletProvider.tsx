"use client";

import { FC, ReactNode, createContext, useContext, useState, useCallback } from "react";

// Create a mock wallet context for demo purposes
// The full Solana wallet adapter requires Node.js Buffer which isn't available in all browser environments

interface WalletContextState {
  connected: boolean;
  connecting: boolean;
  publicKey: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  select: (walletName: string) => void;
}

const WalletContext = createContext<WalletContextState>({
  connected: false,
  connecting: false,
  publicKey: null,
  connect: async () => {},
  disconnect: async () => {},
  select: () => {},
});

export const useWallet = () => useContext(WalletContext);

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setConnecting(true);
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Generate a mock public key
    const mockPublicKey = "Demo" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setPublicKey(mockPublicKey);
    setConnected(true);
    setConnecting(false);
  }, []);

  const disconnect = useCallback(async () => {
    setConnected(false);
    setPublicKey(null);
  }, []);

  const select = useCallback((walletName: string) => {
    console.log("Selected wallet:", walletName);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        publicKey,
        connect,
        disconnect,
        select,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
