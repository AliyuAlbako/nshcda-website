// import { Link, useParams } from "react-router-dom";
// import media from "../data/newsHighlights";
// import MediaCard from "../components/media/MediaCard";

// function NewsHighlightsDetails() {
//   const { slug } = useParams();

//   const item = media.find(
//     (entry) => entry.slug === slug
//   );

//   if (!item) {
//     return (
//       <section className="page-section">
//         <div className="container">
//           <div className="card">
//             <h1>Item Not Found</h1>

//             <p>
//               The requested story could not be found.
//             </p>

//             <Link
//               to="/news-highlights"
//               className="btn"
//               style={{ marginTop: "1rem" }}
//             >
//               Back to News & Highlights
//             </Link>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const relatedItems = media
//     .filter((entry) => entry.id !== item.id)
//     .slice(0, 3);

//   return (
//     <section className="page-section">
//       <div className="container">

//         <article className="event-details card">

//           <span className="article-badge">
//             {item.category === "news"
//               ? "News"
//               : "Highlight"}
//           </span>

//           <h1>{item.title}</h1>

//           <p className="article-meta">
//             {item.date} • {item.location}
//           </p>

//           <div className="event-media-display">
//             {item.type === "video" ? (
//               <div className="video-wrapper">
//                 <iframe
//                   src={item.mediaUrl}
//                   title={item.title}
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               </div>
//             ) : (
//               <img
//                 src={item.mediaUrl}
//                 alt={item.title}
//                 className="event-detail-image"
//               />
//             )}
//           </div>

//           <div className="article-content">
//             <p>{item.description}</p>

//             <p>{item.fullDescription}</p>
//           </div>

//           <div className="details-actions">
//             <Link
//               to="/news-highlights"
//               className="btn btn-outline-dark"
//             >
//               Back to News & Highlights
//             </Link>
//           </div>

//         </article>

//         {relatedItems.length > 0 && (
//           <div style={{ marginTop: "4rem" }}>
//             <h2 className="staff-group-title">
//               Related Stories
//             </h2>

//             <div className="grid">
//               {relatedItems.map((related) => (
//                 <MediaCard
//                   key={related.id}
//                   item={related}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }

// export default NewsHighlightsDetails;

// =================================second code=========================

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import MediaCard from "../components/media/MediaCard";


function NewsHighlightsDetails() {
  const { slug } = useParams();


  // ============================================
  // STATE
  // ============================================

  const [item, setItem] = useState(null);

  const [relatedItems, setRelatedItems] =
    useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ============================================
  // FETCH NEWS / HIGHLIGHT
  // ============================================

  useEffect(() => {

    const fetchNewsHighlight = async () => {

      try {

        setLoading(true);

        setError("");


        // Fetch current item
        const response = await API.get(
          `/news-highlights/slug/${slug}`
        );


        const currentItem =
          response.data.data;


        setItem(currentItem);


        // Fetch all items for related stories
        const relatedResponse =
          await API.get(
            "/news-highlights"
          );


        const allItems =
          relatedResponse.data.data || [];


        // Remove current item and show up to 3
        const related = allItems
          .filter(
            (entry) =>
              entry._id !== currentItem._id
          )
          .slice(0, 3);


        setRelatedItems(related);

      } catch (error) {

        console.error(
          "Failed to load news/highlight:",
          error
        );


        setError(
          error.response?.data?.message ||
          "The requested story could not be found."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchNewsHighlight();

  }, [slug]);


  // ============================================
  // LOADING
  // ============================================

  if (loading) {

    return (

      <section className="page-section">

        <div className="container">

          <div className="publications-message">

            <p>
              Loading story...
            </p>

          </div>

        </div>

      </section>

    );

  }


  // ============================================
  // ERROR / NOT FOUND
  // ============================================

  if (error || !item) {

    return (

      <section className="page-section">

        <div className="container">

          <div className="card">

            <h1>
              Item Not Found
            </h1>

            <p>
              {error ||
                "The requested story could not be found."}
            </p>

            <Link
              to="/news-highlights"
              className="btn"
              style={{
                marginTop: "1rem",
              }}
            >
              Back to News & Highlights
            </Link>

          </div>

        </div>

      </section>

    );

  }


  return (

    <section className="page-section">

      <div className="container">


        {/* =====================================
            STORY DETAILS
        ===================================== */}

        <article className="event-details card">


          {/* CATEGORY */}

          <span className="article-badge">

            {item.category === "news"
              ? "News"
              : "Highlight"}

          </span>


          {/* TITLE */}

          <h1>
            {item.title}
          </h1>


          {/* META */}

          <p className="article-meta">

            {item.date}

            {item.location &&
              ` • ${item.location}`}

          </p>


          {/* =====================================
              MEDIA
          ===================================== */}

          <div className="event-media-display">

            {item.type === "video" ? (

              <div className="video-wrapper">

                <iframe
                  src={item.mediaUrl}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

              </div>

            ) : (

              item.mediaUrl ? (

                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="event-detail-image"
                />

              ) : item.thumbnail?.url ? (

                <img
                  src={item.thumbnail.url}
                  alt={item.title}
                  className="event-detail-image"
                />

              ) : null

            )}

          </div>


          {/* =====================================
              ARTICLE CONTENT
          ===================================== */}

          <div className="article-content">

            {item.description && (

              <p>
                {item.description}
              </p>

            )}


            {item.fullDescription && (

              <p>
                {item.fullDescription}
              </p>

            )}

          </div>


          {/* =====================================
              BACK BUTTON
          ===================================== */}

          <div className="details-actions">

            <Link
              to="/news-highlights"
              className="btn btn-outline-dark"
            >
              Back to News & Highlights
            </Link>

          </div>

        </article>


        {/* =====================================
            RELATED STORIES
        ===================================== */}

        {relatedItems.length > 0 && (

          <div
            style={{
              marginTop: "4rem",
            }}
          >

            <h2 className="staff-group-title">

              Related Stories

            </h2>


            <div className="grid program-grid">

              {relatedItems.map(
                (related) => (

                  <MediaCard
                    key={related._id}
                    item={related}
                  />

                )
              )}

            </div>

          </div>

        )}

      </div>

    </section>

  );
}


export default NewsHighlightsDetails;