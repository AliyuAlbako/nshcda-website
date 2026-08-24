import { useEffect, useState } from "react";

import {
  FaSearch,
  FaFileAlt,
  FaDownload,
  FaCalendarAlt,
  FaFolderOpen,
} from "react-icons/fa";

import API from "../services/api";


function Publications() {
  const [publications, setPublications] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ============================================
  // FETCH PUBLICATIONS
  // ============================================

  useEffect(() => {

    const fetchPublications = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await API.get(
          "/publications"
        );

        setPublications(
          response.data.data || []
        );

      } catch (error) {

        console.error(
          "Failed to load publications:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Failed to load publications."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchPublications();

  }, []);


  // ============================================
  // GET UNIQUE CATEGORIES
  // ============================================

  const categories = [
    "All",

    ...new Set(
      publications
        .map(
          (publication) =>
            publication.category
        )
        .filter(Boolean)
    ),
  ];


  // ============================================
  // FILTER PUBLICATIONS
  // ============================================

  const filteredPublications =
    publications.filter((publication) => {

      const searchText =
        search.toLowerCase().trim();


      const matchesSearch =
        !searchText ||
        [
          publication.title,
          publication.description,
          publication.category,
          publication.year?.toString(),
        ]
          .filter(Boolean)
          .some((value) =>
            value
              .toLowerCase()
              .includes(searchText)
          );


      const matchesCategory =
        category === "All" ||
        publication.category === category;


      return (
        matchesSearch &&
        matchesCategory
      );

    });


  return (

    <section className="page-section publications-page">

      <div className="container">


        {/* =====================================
            PAGE HEADER
        ===================================== */}

        <div className="publications-header">

          <span className="section-badge">
            NSHCDA Resources
          </span>


          <h1>
            Publications & Documents
          </h1>


          <p>
            Access official publications, reports,
            strategic documents, guidelines and other
            downloadable resources from the Nasarawa
            State Human Capital Development Agency.
          </p>

        </div>


        {/* =====================================
            SEARCH AND FILTER
        ===================================== */}

        <div className="publications-controls">


          <div className="publications-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search publications..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="publications-filter">

            <FaFolderOpen />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              {categories.map((item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              ))}

            </select>

          </div>

        </div>


        {/* =====================================
            LOADING
        ===================================== */}

        {loading && (

          <div className="publications-message">

            <p>
              Loading publications...
            </p>

          </div>

        )}


        {/* =====================================
            ERROR
        ===================================== */}

        {!loading && error && (

          <div className="publications-message">

            <h3>
              Unable to Load Publications
            </h3>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* =====================================
            PUBLICATIONS GRID
        ===================================== */}

        {!loading && !error && (

          <>

            <div className="publications-results">

              <p>

                {filteredPublications.length}{" "}

                {filteredPublications.length === 1
                  ? "document"
                  : "documents"}{" "}

                available

              </p>

            </div>


            {filteredPublications.length > 0 ? (

              <div className="publications-grid">

                {filteredPublications.map(
                  (publication) => (

                    <article
                      className="publication-card"
                      key={publication._id}
                    >


                      {/* Icon */}

                      <div className="publication-icon">

                        <FaFileAlt />

                      </div>


                      {/* Category */}

                      <span className="publication-category">

                        {publication.category}

                      </span>


                      {/* Title */}

                      <h2>

                        {publication.title}

                      </h2>


                      {/* Description */}

                      {publication.description && (

                        <p className="publication-description">

                          {publication.description}

                        </p>

                      )}


                      {/* Metadata */}

                      <div className="publication-meta">

                        <span>

                          <FaCalendarAlt />

                          {publication.year}

                        </span>

                      </div>


                      {/* Download */}

                      {publication.document?.url && (

                        <a
                          href={
                            publication.document.url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="publication-download-btn"
                        >

                          <FaDownload />

                          Download Document

                        </a>

                      )}

                    </article>

                  )
                )}

              </div>

            ) : (

              <div className="publications-message">

                <FaFileAlt />

                <h3>
                  No Publications Found
                </h3>

                <p>

                  {search ||
                  category !== "All"

                    ? "No documents match your search or filter."

                    : "No publications are available at the moment."}

                </p>

              </div>

            )}

          </>

        )}


      </div>

    </section>

  );
}


export default Publications;