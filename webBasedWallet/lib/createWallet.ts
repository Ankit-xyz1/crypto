import { Keypair } from '@solana/web3.js';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import bs58 from 'bs58'



export const createWallet = () => {
    const mnemonic = generateMnemonic();
    console.log("Mnemonic:", mnemonic);
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/1'/0'`; // ✅ All hardened
    const derived = derivePath(path, seed.toString('hex'));
    const secret = nacl.sign.keyPair.fromSeed(new Uint8Array(derived.key)).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    const privateKey = bs58.encode(keypair.secretKey);
    const PublicKey = keypair.publicKey.toBase58();
    return {
        mnemonic,
        privateKey,
        PublicKey
    }
}

export const AddWallet = (mnemonic: string, walletCount: number) => {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${walletCount + 1}'/0'`;
    const derived = derivePath(path, seed.toString('hex'));
    const secret = nacl.sign.keyPair.fromSeed(new Uint8Array(derived.key)).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    const privateKey = bs58.encode(keypair.secretKey);
    const PublicKey = keypair.publicKey.toBase58();
    return {
        privateKey,
        PublicKey
    }
}