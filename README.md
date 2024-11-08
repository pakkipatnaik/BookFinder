Book Finder is a React-based web application that allows users to search, filter, and explore a wide selection of books. Using the Open Library API, users can browse books by title, author, and year, with results including essential details like author, publisher, publication year, and cover image.

**Features**
Search by Title: Quickly search for books by entering a title in the search bar.
Filter Options: Refine search results by author and publication year for more specific queries.
Pagination: Easily navigate through results using the pagination buttons, allowing you to view multiple pages of books without overwhelming the display.
Responsive Layout: Designed to work seamlessly across different screen sizes.
Sample Books Display: A list of sample books is loaded initially, allowing users to explore popular books even without conducting a search.
Error Handling: Displays error messages if no books are found or if there’s an issue with the search query.

**Usage**
Search for a Book: Enter a book title into the search bar and click "Search". If found, books matching the title will be displayed.
Apply Filters: Use the filters to narrow down results by author name or publication year.
Pagination: Navigate between pages using the "Previous" and "Next" buttons.
Back to Main Page: If no books are found, click the "Back to Main Page" button to return to the list of sample books.

**Project Structure**
App.js: Main application file.Contains the core functionality for searching, filtering, and displaying books.
styles.css: Styles for the components.

**Technologies Used**
React: For building the user interface.
Axios: For making API requests.
CSS: For styling the application.
