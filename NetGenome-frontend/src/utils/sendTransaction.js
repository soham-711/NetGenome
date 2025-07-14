// import {
//   Connection,
//   PublicKey,
//   SystemProgram,
//   Transaction,
//   LAMPORTS_PER_SOL,
//   SendTransactionError,
// } from "@solana/web3.js";

// /**
//  * Sends SOL from the connected wallet to the recipient address.
//  *
//  * @param {Connection} connection - Solana connection object
//  * @param {object} wallet - Wallet adapter object (useWallet)
//  * @param {string} recipient - Base58 string of the recipient's public key
//  * @param {number} amount - Amount in SOL to send
//  * @returns {Promise<string>} - Transaction signature
//  */
// export async function sendSol(connection, wallet, recipient, amount) {
//   if (!wallet.publicKey || !wallet.signTransaction) {
//     throw new Error("❌ Wallet not connected or does not support signing.");
//   }

//   try {
//     const lamports = Math.round(amount * LAMPORTS_PER_SOL);
//     const recipientPubkey = new PublicKey(recipient);

//     if (!lamports || lamports <= 0) {
//       throw new Error("❌ Invalid amount.");
//     }

//     // ✅ Get a fresh blockhash to avoid duplicate transaction issues
//     const { blockhash, lastValidBlockHeight } =
//       await connection.getLatestBlockhash("finalized");

//     const transaction = new Transaction().add(
//       SystemProgram.transfer({
//         fromPubkey: wallet.publicKey,
//         toPubkey: recipientPubkey,
//         lamports,
//       })
//     );

//     // ✅ Set recent blockhash & fee payer
//     transaction.recentBlockhash = blockhash;
//     transaction.feePayer = wallet.publicKey;

//     // ✅ Sign the transaction
//     const signed = await wallet.signTransaction(transaction);
//     const rawTx = signed.serialize();

//     // ✅ Send the signed transaction
//     const signature = await connection.sendRawTransaction(rawTx, {
//       skipPreflight: false,
//       preflightCommitment: "confirmed",
//     });

//     // ✅ Confirm with full metadata (avoid duplicate submission)
//     await connection.confirmTransaction(
//       { signature, blockhash, lastValidBlockHeight },
//       "confirmed"
//     );

//     console.log("✅ Sent successfully:", signature);
//     return signature;
//   } catch (err) {
//     console.error("❌ Transaction failed:", err);

//     // Optional: Debug logs if it's a SendTransactionError
//     if (err instanceof SendTransactionError && err.getLogs) {
//       try {
//         const logs = await err.getLogs(connection);
//         console.error("📋 Solana transaction logs:", logs);
//       } catch (logErr) {
//         console.error("⚠️ Couldn't get logs:", logErr);
//       }
//     }

//     throw err;
//   }
// }

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
 * @param {object} wallet - Wallet adapter object (useWallet)
 * @param {string} recipient - Recipient public key as base58 string
 * @param {number} amount - Amount in SOL
 * @returns {Promise<string>} Transaction signature
 */
export async function sendSol(connection, wallet, recipient, amount) {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error("❌ Wallet not connected or cannot sign transactions.");
  }

  const lamports = Math.floor(amount * LAMPORTS_PER_SOL);
  if (!lamports || lamports <= 0) {
    throw new Error("❌ Invalid amount.");
  }

  try {
    const recipientPubkey = new PublicKey(recipient);

    // ✅ Get latest blockhash
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash("finalized");

    // ✅ Create fresh transaction
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

    // ✅ Let wallet sign it
    const signedTransaction = await wallet.signTransaction(transaction);
    const rawTx = signedTransaction.serialize();

    // ✅ Send and confirm
    const txSignature = await connection.sendRawTransaction(rawTx, {
      skipPreflight: false,
      preflightCommitment: "confirmed",
    });

    await connection.confirmTransaction(
      {
        signature: txSignature,
        blockhash,
        lastValidBlockHeight,
      },
      "confirmed"
    );

    console.log("✅ Transaction successful:", txSignature);
    return txSignature;
  } catch (err) {
    console.error("❌ Transaction failed:", err);

    // Debug logs (optional)
    if (err instanceof SendTransactionError && err.getLogs) {
      try {
        const logs = await err.getLogs(connection);
        console.error("📋 Solana transaction logs:", logs);
      } catch (logErr) {
        console.warn("⚠️ Failed to fetch transaction logs:", logErr);
      }
    }

    throw err;
  }
}
