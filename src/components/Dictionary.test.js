import React from "react";
import renderer from "react-test-renderer";
import Dictionary from "./Dictionary";

// Snapshot test for the Dictionary component
// This test ensures that the Dictionary component renders correctly
// and that the rendered output matches the stored snapshot.

// Note: The strikethrough on `renderer.create` indicates that it might be
// deprecated or that there is a newer preferred method. However, as of
// react-test-renderer version 18.3.1, this method is still widely used
// and functions correctly for snapshot testing.

test("Dictionary component renders correctly", () => {
  // Create a snapshot of the Dictionary component
  const tree = renderer.create(<Dictionary />).toJSON();

  // Compare the rendered component to the stored snapshot
  // If the rendered output changes, the test will fail
  expect(tree).toMatchSnapshot();
});
