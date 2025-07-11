// // api/onboarding.js
// import express, { response } from "express";
// import dotenv from "dotenv";
// import { GoogleGenAI } from "@google/genai"; // ✅ correct package name

// dotenv.config();
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// const ai = new GoogleGenAI(GEMINI_API_KEY); // ✅ instantiate properly

// export const onboardingFunc = async (req, res) => {
//   try {
//     const { message } = req.body;

//  const prompt = `
// You are an assistant helping users find music collaborators.

// Based on this message: "${message}", suggest:
// - genres
// - artist roles
// - vibe tags
// - language(s)
// - location preference
// - gender preference

// Return ONLY this JSON format:
// {
//   "genres": [],
//   "roles": [],
//   "vibeTags": [],
//   "language": [],
//   "location": "",
//   "genderPreference": ""
// }
// `;

//   async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: prompt,
//   });
//   console.log(response.text);
//   res.status(200).json(response.text);
// }
//  main();
//   } catch (error) {
//     console.error("Gemini onboarding error:", error.message);
//     res.status(500).json({ error: "Gemini AI failed to return valid JSON" });
//   }
// };

// api/onboarding.js
import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is required in environment variables");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Onboarding flow configuration
const ONBOARDING_STEPS = [
  {
    id: "genres",
    question: "What music genres are you interested in collaborating on?",
    hint: "Select all that apply - you can choose multiple genres",
    type: "multiple_choice",
    options: [
      "Pop",
      "Rock",
      "Hip-hop",
      "R&B",
      "Jazz",
      "Electronic",
      "Country",
      "Folk",
      "Classical",
      "Indian Classical",
      "World",
      "Indie",
      "Alternative",
      "Fusion",
      "Other",
    ],
  },
  {
    id: "roles",
    question: "What roles are you looking for in collaborators?",
    hint: "What kind of musicians do you want to work with?",
    type: "multiple_choice",
    options: [
      "Vocalist",
      "Guitarist",
      "Bassist",
      "Drummer",
      "Keyboardist",
      "Producer",
      "Songwriter",
      "Sound Engineer",
      "DJ",
      "Rapper",
      "Violinist",
      "Composer",
      "Other",
    ],
  },
  {
    id: "vibeTags",
    question: "What vibe or mood are you going for in your music?",
    hint: "This helps match you with collaborators who share your creative vision",
    type: "multiple_choice",
    options: [
      "Chill",
      "Energetic",
      "Dark",
      "Uplifting",
      "Melancholic",
      "Aggressive",
      "Romantic",
      "Experimental",
      "Commercial",
      "Underground",
      "Ambient",
      "World Fusion",
      "Raw",
      "Dreamy",
    ],
  },
  {
    id: "language",
    question: "What language(s) do you prefer for lyrics and communication?",
    hint: "Select all languages you're comfortable with",
    type: "multiple_choice",
    options: [
      "English",
      "Spanish",
      "French",
      "German",
      "Italian",
      "Portuguese",
      "Japanese",
      "Korean",
      "Mandarin",
      "Hindi",
      "Arabic",
      "Other",
    ],
  },
  {
    id: "location",
    question: "Where are you located or willing to collaborate?",
    hint: "You can specify a city, region, or say 'Remote' for online collaboration",
    type: "text",
    placeholder: "e.g., Los Angeles, CA or Remote or New York, NY",
  },
  {
    id: "gender",
    question: "What is your gender identity?",
    hint: "Share your gender identity if you're comfortable doing so",
    type: "text",
    placeholder: "e.g., Male, Female, Non-binary, or prefer not to say",
    required: false,
  },
];

// Get current onboarding step
export const getCurrentStep = async (req, res) => {
  try {
    const { stepIndex = 0 } = req.query;
    const currentStepIndex = parseInt(stepIndex);

    if (currentStepIndex >= ONBOARDING_STEPS.length) {
      return res.status(200).json({
        completed: true,
        message: "Onboarding completed successfully!",
      });
    }

    const currentStep = ONBOARDING_STEPS[currentStepIndex];

    res.status(200).json({
      step: currentStep,
      stepIndex: currentStepIndex,
      totalSteps: ONBOARDING_STEPS.length,
      progress: Math.round((currentStepIndex / ONBOARDING_STEPS.length) * 100),
    });
  } catch (error) {
    console.error("Get current step error:", error.message);
    res.status(500).json({ error: "Failed to get current step" });
  }
};

// Process user response and move to next step
export const processStep = async (req, res) => {
  try {
    const { stepIndex, answer, userResponses = {} } = req.body;

    if (stepIndex >= ONBOARDING_STEPS.length) {
      return res.status(400).json({ error: "Invalid step index" });
    }

    const currentStep = ONBOARDING_STEPS[stepIndex];

    // Validate answer
    if (!answer || (Array.isArray(answer) && answer.length === 0)) {
      return res.status(400).json({
        error: "Answer is required",
        step: currentStep,
      });
    }

    // Process the answer based on step type
    let processedAnswer = answer;

    if (currentStep.type === "multiple_choice") {
      // Handle comma-separated answers or single answers
      if (typeof answer === "string") {
        processedAnswer = answer
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a);
      }
    }

    // Store the response
    userResponses[currentStep.id] = processedAnswer;

    const nextStepIndex = stepIndex + 1;

    // Check if onboarding is complete
    if (nextStepIndex >= ONBOARDING_STEPS.length) {
      // Generate final profile using AI
      const profile = await generateUserProfile(userResponses);

      return res.status(200).json({
        completed: true,
        userResponses,
        profile,
        message: "Onboarding completed! Your profile has been created.",
      });
    }

    // Return next step
    const nextStep = ONBOARDING_STEPS[nextStepIndex];

    res.status(200).json({
      step: nextStep,
      stepIndex: nextStepIndex,
      totalSteps: ONBOARDING_STEPS.length,
      progress: Math.round((nextStepIndex / ONBOARDING_STEPS.length) * 100),
      userResponses,
    });
  } catch (error) {
    console.error("Process step error:", error.message);
    res.status(500).json({ error: "Failed to process step" });
  }
};

// Generate user profile using AI
const generateUserProfile = async (userResponses) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Based on the following user responses, create a detailed music collaborator profile:

User Responses:
${JSON.stringify(userResponses, null, 2)}

Generate a comprehensive profile that includes:
1. A brief bio/description (2-3 sentences)
2. Musical style summary (1-2 sentences)
3. Collaboration preferences (what they're looking for)
4. Strengths and what they bring to collaborations
5. Ideal collaborator matches

Return the response in this JSON format:
{
  "bio": "Brief description of the user's musical background and interests",
  "musicalStyle": "Summary of their preferred genres and vibes",
  "collaborationPreferences": "What they're looking for in collaborators",
  "strengths": "What they bring to the table",
  "idealMatches": "Description of ideal collaborator profiles",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "profileScore": 85
}

Make it engaging and professional. The profileScore should be 1-100 based on how complete and specific their responses are.
Keep each field concise but informative.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Try to parse JSON from the response
    let profile;
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        profile = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback profile
      profile = createFallbackProfile(userResponses);
    }

    return profile;
  } catch (error) {
    console.error("AI profile generation error:", error.message);
    return createFallbackProfile(userResponses);
  }
};

// Create fallback profile if AI fails
const createFallbackProfile = (userResponses) => {
  const genres = Array.isArray(userResponses.genres)
    ? userResponses.genres
    : [userResponses.genres].filter(Boolean);
  const roles = Array.isArray(userResponses.roles)
    ? userResponses.roles
    : [userResponses.roles].filter(Boolean);
  const vibes = Array.isArray(userResponses.vibeTags)
    ? userResponses.vibeTags
    : [userResponses.vibeTags].filter(Boolean);

  return {
    bio: `Music enthusiast passionate about ${genres.join(", ")} looking for meaningful collaborations.`,
    musicalStyle: `Focuses on ${genres.join(", ")} with ${vibes.join(", ")} vibes.`,
    collaborationPreferences: `Seeking ${roles.join(", ")} for creative projects.`,
    strengths:
      userResponses.experience ||
      "Passionate about music and eager to collaborate.",
    idealMatches: `Musicians who share interest in ${genres.slice(0, 2).join(" and ")} music.`,
    tags: [...genres.slice(0, 3), ...vibes.slice(0, 2)].filter(Boolean),
    profileScore: 75,
  };
};

// Smart AI-powered response processing
export const processNaturalLanguageResponse = async (req, res) => {
  try {
    const { message, stepIndex } = req.body;

    if (stepIndex >= ONBOARDING_STEPS.length) {
      return res.status(400).json({ error: "Invalid step index" });
    }

    const currentStep = ONBOARDING_STEPS[stepIndex];

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
The user is answering this onboarding question: "${currentStep.question}"
Question type: ${currentStep.type}
Available options: ${currentStep.options ? currentStep.options.join(", ") : "Free text"}
User's response: "${message}"

Based on their natural language response, extract the relevant information and format it properly.

For multiple choice questions, return matching options from the available list. Be flexible with matching - if they say "hip hop" match it to "Hip-hop", if they say "singing" match it to "Vocalist", etc.
For text questions, clean and format the response appropriately.

Return ONLY a JSON object with this structure:
{
  "extractedAnswer": "the processed answer in the correct format",
  "confidence": 0.95,
  "reasoning": "brief explanation of how you interpreted their response"
}

If it's a multiple choice question, extractedAnswer should be an array of matching options.
If it's a text question, extractedAnswer should be a cleaned string.
If you can't find good matches, return the original message as a string.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Parse the AI response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const aiResponse = JSON.parse(jsonMatch[0]);

      res.status(200).json({
        processedAnswer: aiResponse.extractedAnswer,
        confidence: aiResponse.confidence,
        reasoning: aiResponse.reasoning,
        originalMessage: message,
      });
    } else {
      throw new Error("Failed to parse AI response");
    }
  } catch (error) {
    console.error("Natural language processing error:", error.message);
    res.status(500).json({
      error: "Failed to process natural language response",
      fallback: message, // Return original message as fallback
    });
  }
};

// Post-completion chat handling
export const handlePostCompletionChat = async (req, res) => {
  try {
    const { message, userProfile, userResponses } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a music collaboration assistant. The user has completed their onboarding and now has this profile:

Profile: ${JSON.stringify(userProfile, null, 2)}
Original Responses: ${JSON.stringify(userResponses, null, 2)}

User's message: "${message}"

Respond naturally as a helpful assistant. You can:
1. Answer questions about their profile
2. Suggest potential collaborators based on their preferences
3. Offer to modify their preferences
4. Give advice about music collaboration
5. Help them understand what makes a good match

Keep responses conversational and helpful. If they want to change something, explain how they can do that.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({
      response: text,
      suggestions: [], // Could add dynamic suggestions here
    });
  } catch (error) {
    console.error("Post-completion chat error:", error.message);
    res.status(500).json({
      error:
        "I'm having trouble processing that. Could you try asking in a different way?",
    });
  }
};

// Routes
router.get("/step", getCurrentStep);
router.post("/step", processStep);
router.post("/process-message", processNaturalLanguageResponse);
router.post("/chat", handlePostCompletionChat);

export default router;
