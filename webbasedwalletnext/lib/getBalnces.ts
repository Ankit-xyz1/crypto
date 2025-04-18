import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

export const getSoBalance = async (
  publicKey: string | null
): Promise<number | null> => {
  if (!publicKey) return null;
  console.log("pybkey", publicKey);
  const apiUrl = "https://solana-mainnet.g.alchemy.com/v2/gZ2pJjhfXkycfQsUGo8aW-oOgVuxFYqg";
  console.log("api url", apiUrl);
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "getBalance",
    params: [publicKey],
  };
  if (apiUrl) {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      return data.result.value / 1000000000;
    } else {
      return null;
    }
  }
  return null;
};
export const getSoBalanceOnDevnet = async (
  publicKey: string | null
): Promise<number | null> => {
  if (!publicKey) return null;
  console.log("pybkey", publicKey);
  const apiUrl = "https://solana-devnet.g.alchemy.com/v2/gZ2pJjhfXkycfQsUGo8aW-oOgVuxFYqg"
  console.log("api url", apiUrl);
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "getBalance",
    params: [publicKey],
  };
  if (apiUrl) {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      return data.result.value / 1000000000;
    } else {
      return null;
    }
  }
  return null;
};

export const ReqFaucet = async (publicKey: string):Promise<boolean> => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const address = new PublicKey(publicKey);
    await connection.requestAirdrop(address, 0.5 * LAMPORTS_PER_SOL);
    return true
  } catch (error) {
    console.log(error);
    return false
  }
};
