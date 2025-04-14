import * as ed from "@noble/ed25519";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

async function cryptos() {
  const pvtkey = ed.utils.randomPrivateKey();
  const mssg = new TextEncoder().encode("hello world");
  const mssg2 = new TextEncoder().encode("hello ");
  const publicKey = await ed.getPublicKeyAsync(pvtkey);
  const signature = await ed.signAsync(mssg, pvtkey);
  const checkSignIsValid = await ed.verifyAsync(signature, mssg2, publicKey);
  console.log(checkSignIsValid);
}

//cryptos();

async function SolanKey() {
  const keypair = Keypair.generate();
  const publicKey = keypair.publicKey.toString();
  const privateKey = keypair.secretKey;
  console.log("public key", publicKey, `\n`, "pvt key :", privateKey);
  const message = new TextEncoder().encode("send 20 sol");
  const signature = nacl.sign.detached(message, privateKey);
  const verify = nacl.sign.detached.verify(message,signature, keypair.publicKey.toBytes())
  console.log("verify",verify)
}

SolanKey()