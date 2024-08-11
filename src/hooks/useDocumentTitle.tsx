import { useEffect } from "react";

/**
 * A custom React hook to dynamically set the content of the HTML `<title>` tag.
 * It targets an element with the ID "app-title" within the `<title>` tag in the index.html file.
 *
 * @param query - The string to be used as the new title content.
 **/

export default function useDocumentTitle(query: string): void {
  useEffect(() => {
    const titleApp = document.querySelector("#app-title");

    if (titleApp) {
      titleApp.innerHTML = query;
    }
  }, [query]);
}
