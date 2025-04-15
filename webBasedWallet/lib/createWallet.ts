import { Keypair } from '@solana/web3.js';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import bs58 from 'bs58'



interface walletType {
    privateKey: string | null,
    PublicKey: string | null,
}

export const createWallet = () => {
    try {
        console.log("funcc1")
        const mnemonic = generateMnemonic();
        console.log("Mnemonic:", mnemonic);
        const seed = mnemonicToSeedSync(mnemonic);
        console.log(mnemonic);
        const path = `m/44'/501'/1'/0'`; // ✅ All hardened
        const derived = derivePath(path, seed.toString('hex'));
        const secret = nacl.sign.keyPair.fromSeed(new Uint8Array(derived.key)).secretKey;
        console.log(secret)
        const keypair = Keypair.fromSecretKey(secret);
        const privateKeyBase58 = bs58.encode(keypair.secretKey);
        console.log("Private Key (for Phantom):", privateKeyBase58);
        const PublicKey = keypair.publicKey.toBase58();
        console.log(PublicKey)
        return {
            mnemonic,
            privateKey: privateKeyBase58,
            PublicKey
        }
    } catch (error) {
        console.log(error)
        return {
            privateKey: null,
            PublicKey: null
        }
    }
}

export const AddWallet = (mnemonic: string, walletCount: number): walletType => {
    try {

        const seed = mnemonicToSeedSync(mnemonic);
        console.log(mnemonic);
        const path = `m/44'/501'/${walletCount}'/0'`; // ✅ All hardened
        const derived = derivePath(path, seed.toString('hex'));
        const secret = nacl.sign.keyPair.fromSeed(new Uint8Array(derived.key)).secretKey;
        console.log(secret)
        const keypair = Keypair.fromSecretKey(secret);
        const privateKeyBase58 = bs58.encode(keypair.secretKey);
        console.log("Private Key (for Phantom):", privateKeyBase58);
        const PublicKey = keypair.publicKey.toBase58();
        console.log(PublicKey)
        return {
            privateKey:privateKeyBase58,
            PublicKey
        }
    } catch (error) {

        console.log(error)
        return {
            privateKey: null,
            PublicKey: null
        }
    }
}