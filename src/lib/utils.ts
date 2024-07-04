/**
 * Capitalizes the first letter of each word in a string or array of strings.
 *
 * @param {string | string[]} input - The string or array of strings to capitalize.
 * @returns {string} The capitalized string.
 * @example
 * const sentence = "this is a sentence.";
 * const capitalizedSentence = capitalizeWords(sentence);  // "This Is A Sentence"
 * const words = ["hello", "world"];
 * const capitaliseSentence = capitalizeWords(words);  // "Hello World"
 */

const capitalizeWords = (input: string | string[]): string => {
  if (typeof input === "string") {
    input = input.split(" ");
  }

  const capializedWords = input.map(
    (word) => word[0].toUpperCase() + word.slice(1)
  );

  return capializedWords.join(" ");
};

export { capitalizeWords };
