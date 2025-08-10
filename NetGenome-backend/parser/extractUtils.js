// import fs from "fs";
// import path from "path";
// import pdfParse from "pdf-parse";
// import mammoth from "mammoth";
// import unzipper from "unzipper";
// import Tesseract from "tesseract.js";
// import os from "os";

// const TEMP_IMAGE_DIR = path.join(os.tmpdir(), "artist_extract_images");
// if (!fs.existsSync(TEMP_IMAGE_DIR)) {
//   fs.mkdirSync(TEMP_IMAGE_DIR, { recursive: true });
// }

// /**
//  * Clean temporary image directory
//  */
// function cleanTempDir() {
//   try {
//     if (fs.existsSync(TEMP_IMAGE_DIR)) {
//       for (const file of fs.readdirSync(TEMP_IMAGE_DIR)) {
//         fs.unlinkSync(path.join(TEMP_IMAGE_DIR, file));
//       }
//     }
//   } catch (err) {
//     console.warn("⚠ Temp cleanup error:", err);
//   }
// }

// /**
//  * OCR an image file
//  * @param {string} imagePath
//  * @returns {Promise<string>}
//  */
// export async function ocrImage(imagePath) {
//   try {
//     const res = await Tesseract.recognize(imagePath, "eng");
//     return res.data.text?.trim() || "";
//   } catch (err) {
//     console.error("❌ OCR error:", err);
//     return "";
//   }
// }

// /**
//  * Extract text & images from DOCX file
//  * @param {string} filePath
//  * @returns {Promise<{text: string, images: string[]}>}
//  */
// export async function extractFromDocx(filePath) {
//   cleanTempDir();
//   let text = "";
//   let extractedImages = [];

//   try {
//     // Extract plain text
//     const result = await mammoth.extractRawText({ path: filePath });
//     text = result.value || "";

//     // Extract embedded images
//     await fs.createReadStream(filePath)
//       .pipe(unzipper.Parse())
//       .on("entry", (entry) => {
//         if (entry.path.startsWith("word/media/")) {
//           const outPath = path.join(TEMP_IMAGE_DIR, path.basename(entry.path));
//           entry.pipe(fs.createWriteStream(outPath));
//           extractedImages.push(outPath);
//         } else {
//           entry.autodrain();
//         }
//       })
//       .promise();
//   } catch (err) {
//     console.error("❌ DOCX extraction error:", err);
//   }

//   return { text, images: extractedImages };
// }

// /**
//  * Extract text (and optional OCR) from PDF file
//  * @param {string} filePath
//  * @param {boolean} ocrIfEmpty - if true, OCR will run when text is empty
//  * @returns {Promise<{text: string, images: string[]}>}
//  */
// export async function extractFromPdf(filePath, ocrIfEmpty = true) {
//   cleanTempDir();
//   let text = "";
//   let images = [];

//   try {
//     const buffer = fs.readFileSync(filePath);
//     const data = await pdfParse(buffer);
//     text = data.text || "";

//     // If PDF has no text and OCR is enabled
//     if (!text.trim() && ocrIfEmpty) {
//       console.log("📄 No text found in PDF — running OCR on entire file...");
//       // Convert PDF pages to images and OCR them (requires extra lib like pdf-poppler or pdf2pic)
//       // Placeholder: currently, we can't extract embedded images directly with pdf-parse
//       // You could add a PDF-to-image conversion step here if needed.
//     }
//   } catch (err) {
//     console.error("❌ PDF extraction error:", err);
//   }

//   return { text, images };
// }




import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import unzipper from "unzipper";
import Tesseract from "tesseract.js";
import os from "os";

const TEMP_IMAGE_DIR = path.join(os.tmpdir(), "artist_extract_images");
if (!fs.existsSync(TEMP_IMAGE_DIR)) {
  fs.mkdirSync(TEMP_IMAGE_DIR, { recursive: true });
}

/**
 * Clean temporary image directory
 */
function cleanTempDir() {
  try {
    if (fs.existsSync(TEMP_IMAGE_DIR)) {
      for (const file of fs.readdirSync(TEMP_IMAGE_DIR)) {
        fs.unlinkSync(path.join(TEMP_IMAGE_DIR, file));
      }
    }
  } catch (err) {
    console.warn("⚠ Temp cleanup error:", err);
  }
}

/**
 * OCR an image file
 */
export async function ocrImage(imagePath) {
  try {
    const res = await Tesseract.recognize(imagePath, "eng");
    return res.data.text?.trim() || "";
  } catch (err) {
    console.error("❌ OCR error:", err);
    return "";
  }
}

/**
 * Split long text into interview chunks based on keywords
 */
function splitIntoArtistChunks(text) {
  return text
    .split(/(?:Interview with|INTERVIEW WITH|Artist Name:|ARTIST NAME:)/i)
    .map(t => t.trim())
    .filter(t => t.length > 50); // ignore very short fragments
}

/**
 * Extract text & images from DOCX file
 */
export async function extractFromDocx(filePath) {
  cleanTempDir();
  let text = "";
  let extractedImages = [];

  try {
    // Extract plain text
    const result = await mammoth.extractRawText({ path: filePath });
    text = result.value || "";

    // Extract embedded images
    await fs.createReadStream(filePath)
      .pipe(unzipper.Parse())
      .on("entry", (entry) => {
        if (entry.path.startsWith("word/media/")) {
          const outPath = path.join(TEMP_IMAGE_DIR, path.basename(entry.path));
          entry.pipe(fs.createWriteStream(outPath));
          extractedImages.push(outPath);
        } else {
          entry.autodrain();
        }
      })
      .promise();
  } catch (err) {
    console.error("❌ DOCX extraction error:", err);
  }

  // Split into multiple artist interview chunks
  const chunks = splitIntoArtistChunks(text);

  return { text, chunks, images: extractedImages };
}

/**
 * Extract text (and optional OCR) from PDF file
 */
export async function extractFromPdf(filePath, ocrIfEmpty = true) {
  cleanTempDir();
  let text = "";
  let images = [];

  try {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    text = data.text || "";

    if (!text.trim() && ocrIfEmpty) {
      console.log("📄 No text found in PDF — running OCR...");
      // You can add PDF-to-image conversion + OCR here if needed
    }
  } catch (err) {
    console.error("❌ PDF extraction error:", err);
  }

  // Split into multiple artist interview chunks
  const chunks = splitIntoArtistChunks(text);

  return { text, chunks, images };
}
