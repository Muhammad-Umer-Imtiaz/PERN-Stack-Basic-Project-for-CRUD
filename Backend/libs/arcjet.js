import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";


export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"], 
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
      ],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10, 
      capacity: 10, 
    }),
  ],
});
