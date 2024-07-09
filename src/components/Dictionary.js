import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";

// Dictionary component that fetches and displays definitions and examples of words
const Dictionary = () => {
  // State variables to hold the word, definition, example, and error message
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [error, setError] = useState("");

  // Function to fetch the definition and example from the Merriam-Webster API
  const fetchDefinition = async () => {
    try {
      // Make an HTTP GET request to the Merriam-Webster API
      const response = await axios.get(
        `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${process.env.REACT_APP_DICTIONARY_API_KEY}`
      );
      const data = response.data;

      // Check if the response contains valid data
      if (data.length > 0 && typeof data[0] === "object") {
        // Set the definition from the API response
        setDefinition(
          data[0].shortdef ? data[0].shortdef[0] : "No definition found"
        );

        // Extract the example sentence if it exists
        const exampleData = data[0]?.def?.[0]?.sseq?.[0]?.[0]?.[1]?.dt?.find(
          (dtItem) => Array.isArray(dtItem) && dtItem[0] === "vis"
        );
        const exampleSentence = exampleData
          ? exampleData[1][0].t
          : "No example found";

        // Format the example sentence to replace {it} tags with <i> tags for italicization
        const formattedExample = exampleSentence
          .replace(/{it}/g, "<i>")
          .replace(/{\/it}/g, "</i>");

        // Set the example sentence in the state
        setExample(formattedExample || "No example found");
      } else {
        // Set default messages if no valid data is found
        setDefinition("No definition found");
        setExample("No example found");
      }
    } catch (err) {
      console.error(err); // Log the error
      setError("Failed to fetch definition");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDefinition();
  };

  return (
    <div className="container">
      <h1>Dictionary App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button type="submit">Get Definition</button>
      </form>
      {error && <p>{error}</p>}
      {definition && (
        <div className="definition-container">
          <h2>Definition:</h2>
          <p>{definition}</p>
        </div>
      )}
      {example && (
        <div className="example-container">
          <h2>Example:</h2>
          <p dangerouslySetInnerHTML={{ __html: example }} />
        </div>
      )}
    </div>
  );
};

export default Dictionary;
