import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Dictionary from "./Dictionary";

// Create a mock adapter for axios to simulate API responses
const mock = new MockAdapter(axios);

// Test for the fetchDefinition function
// This test ensures that the fetchDefinition function correctly fetches
// and displays the definition and example for a given word.
test("fetchDefinition fetches and displays definition and example", async () => {
  // The word to be searched in the dictionary
  const word = "example";
  // Mock response for the dictionary API
  const definitionResponse = [
    {
      shortdef: ["a representative form or pattern"],
      def: [
        {
          sseq: [
            [
              [
                "sense",
                {
                  dt: [
                    [
                      "vis",
                      [
                        {
                          t: "This is an {it}example{/it} sentence.",
                        },
                      ],
                    ],
                  ],
                },
              ],
            ],
          ],
        },
      ],
    },
  ];

  // Mock the GET request to the dictionary API
  mock
    .onGet(
      `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${process.env.REACT_APP_DICTIONARY_API_KEY}`
    )
    .reply(200, definitionResponse);

  // Render the Dictionary component
  render(<Dictionary />);

  // Simulate user input and form submission
  fireEvent.change(screen.getByPlaceholderText("Enter a word"), {
    target: { value: word },
  });
  fireEvent.click(screen.getByText("Get Definition"));

  // Assert that the definition is displayed correctly
  await screen.findByText("a representative form or pattern");

  // Assert that the example is displayed correctly
  // Check the text content of the parent element that contains the entire example text
  const exampleContainer = screen.getByText("Example:").closest("div");
  expect(exampleContainer).toHaveTextContent("This is an example sentence.");
});
