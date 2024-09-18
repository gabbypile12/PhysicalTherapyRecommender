// Create a new API key

// Export your API key as an environment variable so that you can use it anywhere
// `export OPENAI_API_KEY="your_api_key_here"`

// To use the OpenAI API in server-side JavaScript environments like Node.js, Deno, 
// or Bun, you can use the official OpenAI SDK for TypeScript and JavaScript.
// Get started by installing the SDK using npm or your preferred package manager.

// Install the OpenAI SDK with npm
// npm install openai

// Create a .mjs file where API is called to generate text
// File: example.mjs

import React, { useState } from "react";
import OpenAI from "openai";

// Initialize an OpenAI API client object
const openai = new OpenAI();

// We will be using OpenAI's Chat Completions API!

// This function call uses the OpenAI chat.completions API endpoint
// to generate a response to a user prompt.
// It sends a request to OpenAI's API.
const completion = await openai.chat.completions.create({ //this is an API call!
    // Specify the model version to use
    model: "gpt-4o-mini",
    // Define a conversation history with two messages
    // This is a list of dictionaries, where each dictionary represents a message
    // in a conversation. Each message has a `role` and `content`.
    // "system": ...
    // "user": represents input from the end user

    // You need to send the entire history (both user and assistant responses) with each API request.
    // This helps the model remember context from previous interactions, making its replies more 
    // relevant and coherent. The history builds as more messages are exchanged.
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
    // Set the temperature to control randomness/ creativity or how focused and deterministic it is
    // A lower value (such as 0.2) is better for this project because the care plans do not need to be
    // creative. It better for the plans to be simple, straightforward, and clear in instruction. We
    // want a little variability for unique symptoms, but not too much of it.
    temperature: 0.3,
    // Limit the number of "tokens" (words, characters) for the response; i.e., controlling response length
    // max_tokens = ...
});

// The API responds with a `choices` array. Each choice contains a message, which includes
// the assistant's response. Extract the relevant part and display in it the application.
// Extract and print the generated haiku from the first choice
console.log(completion.choices[0].message.content);


// The `"assistant"` role only appears in the messages list after the user has interacted 
// with the assistant. When you first start a conversation, only the `"user"` and `"system"` 
// roles are used (if you set up system instructions). After the user's initial input, the 
// assistant responds, and this reply is included in the conversation history with 
// the `"assistant"` role. As the conversation continues, every message from the assistant 
// gets labeled with the `"assistant"` role. This helps the API maintain context in the
// ongoing interaction.


// To integrate the API into a web app:
// In React, call the API inside an event handler (like a button click or form submission).
// Use state management to track the conversation and update the UI with each response.
// You can store conversation history in state and keep adding new messages to it.
