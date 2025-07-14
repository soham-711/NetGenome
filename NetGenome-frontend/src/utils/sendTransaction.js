import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  SendTransactionError,
} from "@solana/web3.js";

/**
 * Sends SOL from the connected wallet to a recipient.
 *
 * @param {Connection} connection - Solana RPC connection
 * @param {object} wallet - Wallet adapter object (from useWallet)
 * @param {string} recipient - Base58 public key string of the recipient
 * @param {number} amount - Amount of SOL to send
 * @returns {Promise<string>} - Transaction signature
 */
export async function sendSol(connection, wallet, recipient, amount) {
  if (!wallet?.publicKey || !wallet?.signTransaction) {
    throw new Error("❌ Wallet not connected or cannot sign transactions.");
  }

  const lamports = Math.floor(amount * LAMPORTS_PER_SOL);
  if (!lamports || lamports <= 0) {
    throw new Error("❌ Invalid amount.");
  }

  try {
    const recipientPubkey = new PublicKey(recipient);

    // ✅ 1. Get fresh blockhash
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash("finalized");

    // ✅ 2. Create new transaction with latest blockhash
    const transaction = new Transaction({
      feePayer: wallet.publicKey,
      blockhash,
      lastValidBlockHeight,
    }).add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: recipientPubkey,
        lamports,
      })
    );

    // ✅ 3. Sign transaction
    const signedTx = await wallet.signTransaction(transaction);
    const rawTx = signedTx.serialize();

    // ✅ 4. Send transaction immediately
    const txSignature = await connection.sendRawTransaction(rawTx, {
      skipPreflight: false,
      preflightCommitment: "confirmed",
    });

    // ✅ 5. Confirm transaction
    await connection.confirmTransaction(
      { signature: txSignature, blockhash, lastValidBlockHeight },
      "confirmed"
    );

    console.log("✅ Transaction successful:", txSignature);
    return txSignature;
  } catch (err) {
    console.error("❌ Transaction failed:", err);

    // If it's a transaction error with logs, print them
    if (err instanceof SendTransactionError && err.getLogs) {
      try {
        const logs = await err.getLogs(connection);
        console.error("📋 Transaction logs:", logs);
      } catch (logErr) {
        console.warn("⚠️ Could not fetch logs:", logErr);
      }
    }

    throw err;
  }
}
