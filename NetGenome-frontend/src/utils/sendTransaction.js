import {
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  PublicKey,
  SendTransactionError,
} from "@solana/web3.js";

/**
 * Sends SOL from the connected wallet to the recipient.
 *
 * @param {Connection} connection - Solana connection.
 * @param {object} wallet - Wallet from useWallet.
 * @param {string} recipient - Base58 public key.
 * @param {number} amount - Amount in SOL.
 * @returns {Promise<string>} Transaction signature.
 */
export async function sendSol(connection, wallet, recipient, amount) {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error("Wallet not connected or not capable of signing.");
  }

  try {
    const lamports = Math.round(amount * LAMPORTS_PER_SOL);
    const recipientPubkey = new PublicKey(recipient);

    // 👇 Always fetch a fresh blockhash
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash("confirmed");

    // 👇 Construct a NEW transaction
    const transaction = new Transaction({
      recentBlockhash: blockhash,
      feePayer: wallet.publicKey,
    }).add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: recipientPubkey,
        lamports,
      })
    );

    const signedTx = await wallet.signTransaction(transaction);
    const rawTx = signedTx.serialize();

    const signature = await connection.sendRawTransaction(rawTx, {
      skipPreflight: false,
      preflightCommitment: "confirmed",
    });

    // ⏳ Confirm it
    await connection.confirmTransaction(
      {
        signature,
        blockhash,
        lastValidBlockHeight,
      },
      "confirmed"
    );

    console.log("✅ Transaction Signature:", signature);
    return signature;
  } catch (err) {
    console.error("❌ Transaction failed:", err);

    // Attempt to get logs if possible
    if (err instanceof SendTransactionError && err.getLogs) {
      try {
        const logs = await err.getLogs(connection);
        console.error("📋 Solana transaction logs:", logs);
      } catch (logErr) {
        console.error("🛑 Failed to fetch logs:", logErr);
      }
    }

    throw err;
  }
}
