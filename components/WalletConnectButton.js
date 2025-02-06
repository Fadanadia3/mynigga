// components/WalletConnectButton.js
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

export function WalletConnectButton() {
  const { connect, disconnect } = useConnect()
  const { isConnected } = useAccount()

  return (
    <div>
      {!isConnected ? (
        <div>
          <button onClick={() => connect(new InjectedConnector())}>
            Connecter MetaMask
          </button>
          <button
            onClick={() =>
              connect(
                new WalletConnectConnector({
                  options: {
                    qrcode: true,
                  },
                })
              )
            }
          >
            Connecter WalletConnect
          </button>
        </div>
      ) : (
        <div>
          <p>Wallet connecté</p>
          <button onClick={() => disconnect()}>Déconnecter</button>
        </div>
      )}
    </div>
  )
}
