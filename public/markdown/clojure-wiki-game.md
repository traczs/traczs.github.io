# Codebase Writeup: Clojure Wikipedia Scraper

This Clojure codebase is a library designed to scrape Wikipedia articles and determine the number of links it takes to navigate from a starting Wikipedia article to an end article.

## Key Features

-   **Wikipedia Link Traversal**: The primary function is to calculate the "distance" in terms of clicks between two Wikipedia pages.
-   **Scraping Modes**: It offers both linear and asynchronous scraping methods.
    -   `scrape-targets`: Performs a linear scrape.
    -   `async-scrape-targets-10s`: Performs an asynchronous scrape.
-   **Usage**: The library is run via a Leiningen REPL, and the main function `run-spider` takes three parameters: the scraping function, the starting Wikipedia link extension (e.g., "wiki/Salloon"), and the ending Wikipedia link extension.
    -   Example calls: `(run-spider scrape-targets "wiki/Salloon" "wiki/Acre")`, `(run-spider async-scrape-targets-10s "wiki/Salloon" "wiki/Acre")`.

## Development and History

-   The project was initiated around March 2020, with initial files from a new template and a public API for a synchronous "widget maker" (`make-widget-sync`).
-   By version 0.1.1 (March 3, 2020), documentation on making widgets was added, and the synchronous `make-widget-sync` was removed in favor of asynchronous operations. The widget maker was also fixed to work correctly with daylight savings changes.

## Limitations

-   **Linear Scraping Issues**: The `scrape-targets` function can hang and require a restart.
-   **Performance**: Testing has been limited to 3 links apart, with the linear version being slow and not always successful. Internet speed might be a factor.
-   **Memory**: For links that are far apart, the vector storing all encountered links might run out of memory, despite an attempt to mitigate this by only storing Wikipedia links.
-   **Asynchronous Errors**: The `async-scrape-targets-10s` function throws an error at the beginning or end of each depth it reaches, though it often continues to work.
-   **Untested Territory**: Navigating more than 2 links is considered uncharted and may not work reliably.

## Future Improvements

-   **Path Display**: Enhance the library to show the actual path of links taken between the start and end articles, not just the count.
-   **Bug Fixes**: There's a desire to fix warnings and errors, particularly those related to asynchronous Clojure, pending more knowledge in that area.
