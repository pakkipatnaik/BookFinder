import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const BookFinder = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [sampleBooks, setSampleBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    author: "",
    year: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 6;

  useEffect(() => {
    const fetchSampleBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://openlibrary.org/search.json?q=popular"
        );
        const sample = response.data.docs.slice(0, 12);
        setBooks(sample);
        setSampleBooks(sample);
        setLoading(false);
      } catch (err) {
        setError("Error loading sample books. Please try again.");
        setLoading(false);
      }
    };

    fetchSampleBooks();
  }, []);

  const searchBooks = async () => {
    if (!query && !filters.author) {
      setError("Please enter a title or author to search.");
      return;
    }

    setLoading(true);
    setError("");
    setCurrentPage(1);

    try {
      let url = `https://openlibrary.org/search.json?title=${query}`;
      if (filters.author) {
        url += `&author=${filters.author}`;
      }
      const response = await axios.get(url);
      const results = response.data.docs;
      const filteredResults = results.filter((book: any) => {
        return (
          !filters.year || book.first_publish_year === parseInt(filters.year)
        );
      });

      if (filteredResults.length === 0) {
        setError("No books found.");
        setBooks([]);
      } else {
        setBooks(filteredResults);
        setError("");
      }

      setLoading(false);
    } catch (err) {
      setError("Error fetching books. Please try again.");
      setLoading(false);
    }
  };

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const goToMainPage = () => {
    setQuery("");
    setFilters({ author: "", year: "" });
    setError("");
    setBooks(sampleBooks);
    setCurrentPage(1);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="book-finder-container">
      <h1 className="title">Book Finder</h1>
      <p>
        Use our Book Finder tool to create your own customized list of fiction
        and nonfiction books. Search through more than 50 books on Book Finder
        by author, year, title, and topic.
      </p>

      <div className="content-wrapper">
        <div className="search-section">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a book by title..."
            className="search-input"
          />
          <button onClick={searchBooks} className="search-button">
            Search
          </button>
        </div>

        <div className="filters-section">
          <h3>Filters</h3>
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={filters.author}
            onChange={handleFilterChange}
            className="filter-input"
          />

          <input
            type="text"
            name="year"
            placeholder="Year"
            value={filters.year}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {error === "No books found." && (
        <button onClick={goToMainPage} className="back-button">
          Back to Main Page
        </button>
      )}

      <div className="book-list">
        {currentBooks.map((book: any) => (
          <div key={book.key} className="book-card">
            <h3>{book.title}</h3>
            <p>
              <strong>Author:</strong>{" "}
              {book.author_name?.join(", ") || "Unknown"}
            </p>
            <p>
              <strong>First Published:</strong>{" "}
              {book.first_publish_year || "N/A"}
            </p>
            <p>
              <strong>Publisher:</strong> {book.publisher?.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Pages:</strong> {book.number_of_pages_median || "N/A"}
            </p>
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={`${book.title} cover`}
                className="book-cover"
              />
            ) : (
              <p>No cover image available</p>
            )}
          </div>
        ))}
      </div>

      {books.length > booksPerPage && (
        <div className="pagination">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookFinder;
