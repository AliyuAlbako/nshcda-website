
// import { Link } from "react-router-dom";
// import SectionTitle from "../components/SectionTitle";
// import MediaCard from "../components/media/MediaCard";
// import HighlightCard from "../components/media/HighlightCard";
// import media from "../data/newsHighlights";

// function NewsHighlights() {
//   const featuredStory = media.find(
//     (item) => item.featured
//   );

//   const latestNews = media.filter(
//     (item) =>
//       item.category === "news" &&
//       !item.featured
//   );

//   const recentHighlights = media.filter(
//     (item) =>
//       item.category === "highlight"
//   );

//   return (
//     <section className="page-section">
//       <div className="container">

//     <div className="news-hero">
//   <span className="news-hero-badge">
//     Media Centre
//   </span>

//   <h1>News & Highlights</h1>

//   <p>
//     Stay informed with the latest news, activities,
//     stakeholder engagements, strategic interventions,
//     and human capital development initiatives across
//     Nasarawa State.
//   </p>
// </div>

//         {/* Featured Story */}
//         {featuredStory && (
//           <section className="featured-story card">

//             <div className="featured-story-image">
//               <img
//                 src={featuredStory.thumbnail}
//                 alt={featuredStory.title}
//               />
//             </div>

//             <div className="featured-story-content">

//               <span className="featured-badge">
//                 Featured Story
//               </span>

//               <h2>
//                 {featuredStory.title}
//               </h2>

//               <p className="featured-meta">
//                 {featuredStory.date} • {featuredStory.location}
//               </p>

//               <p>
//                 {featuredStory.description}
//               </p>

//               <Link
//                 to={`/news-highlights/${featuredStory.slug}`}
//                 className="btn"
//               >
//                 Read Full Story
//               </Link>

//             </div>

//           </section>
//         )}

//         {/* Latest News */}
//         {latestNews.length > 0 && (
//           <section className="news-section">

//             <h2>Latest News</h2>

//             <p>
//               Official announcements, interventions,
//               partnerships and key developments from
//               the Nasarawa State Human Capital Development Agency.
//             </p>

//             <div className="grid program-grid">
//               {latestNews.map((item) => (
//                 <MediaCard
//                   key={item.id}
//                   item={item}
//                 />
//               ))}
//             </div>

//           </section>
//         )}

//         {/* Recent Highlights */}
//         {recentHighlights.length > 0 && (
//           <section className="news-section">

//             <h2>
//               Recent Highlights & Activities
//             </h2>

//             <p>
//               Field activities, stakeholder engagements,
//               community outreach programmes and notable
//               events across Nasarawa State.
//             </p>

//             <div className="grid program-grid">
//               {recentHighlights.map((item) => (
//                 <HighlightCard
//                   key={item.id}
//                   item={item}
//                 />
//               ))}
//             </div>

//           </section>
//         )}

//       </div>
//     </section>
//   );
// }

// export default NewsHighlights;

// ==================second code=========================

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import MediaCard from "../components/media/MediaCard";
import HighlightCard from "../components/media/HighlightCard";

import API from "../services/api";


function NewsHighlights() {
  const [media, setMedia] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ============================================
  // FETCH NEWS & HIGHLIGHTS
  // ============================================

  useEffect(() => {

    const fetchNewsHighlights = async () => {

      try {

        setLoading(true);

        setError("");


        const response = await API.get(
          "/news-highlights"
        );


        setMedia(
          response.data.data || []
        );

      } catch (error) {

        console.error(
          "Failed to load news and highlights:",
          error
        );


        setError(
          error.response?.data?.message ||
          "Failed to load news and highlights."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchNewsHighlights();

  }, []);


  // ============================================
  // SEPARATE CONTENT
  // ============================================

  const featuredStory = media.find(
    (item) => item.featured === true
  );


  const latestNews = media.filter(
    (item) =>
      item.category === "news" &&
      !item.featured
  );


  const recentHighlights = media.filter(
    (item) =>
      item.category === "highlight" &&
      !item.featured
  );


  // ============================================
  // LOADING
  // ============================================

  if (loading) {

    return (

      <section className="page-section">

        <div className="container">

          <div className="publications-message">

            <p>
              Loading news and highlights...
            </p>

          </div>

        </div>

      </section>

    );

  }


  // ============================================
  // ERROR
  // ============================================

  if (error) {

    return (

      <section className="page-section">

        <div className="container">

          <div className="publications-message">

            <h3>
              Unable to Load News & Highlights
            </h3>

            <p>
              {error}
            </p>

          </div>

        </div>

      </section>

    );

  }


  return (

    <section className="page-section">

      <div className="container">


        {/* =====================================
            PAGE HERO
        ===================================== */}

        <div className="news-hero">

          <span className="news-hero-badge">
            Media Centre
          </span>

          <h1>
            News & Highlights
          </h1>

          <p>
            Stay informed with the latest news,
            activities, stakeholder engagements,
            strategic interventions, and human
            capital development initiatives across
            Nasarawa State.
          </p>

        </div>


        {/* =====================================
            FEATURED STORY
        ===================================== */}

        {featuredStory && (

          <section className="featured-story card">


            {/* IMAGE */}

            {featuredStory.thumbnail?.url && (

              <div className="featured-story-image">

                <img
                  src={
                    featuredStory.thumbnail.url
                  }
                  alt={
                    featuredStory.title
                  }
                />

              </div>

            )}


            {/* CONTENT */}

            <div className="featured-story-content">

              <span className="featured-badge">

                Featured Story

              </span>


              <h2>

                {featuredStory.title}

              </h2>


              <p className="featured-meta">

                {featuredStory.date}

                {featuredStory.location &&
                  ` • ${featuredStory.location}`}

              </p>


              <p>

                {featuredStory.description}

              </p>


              <Link
                to={`/news-highlights/${featuredStory.slug}`}
                className="btn"
              >

                Read Full Story

              </Link>

            </div>

          </section>

        )}


        {/* =====================================
            LATEST NEWS
        ===================================== */}

        {latestNews.length > 0 && (

          <section className="news-section">

            <h2>
              Latest News
            </h2>

            <p>
              Official announcements, interventions,
              partnerships and key developments from
              the Nasarawa State Human Capital
              Development Agency.
            </p>


            <div className="grid program-grid">

              {latestNews.map((item) => (

                <MediaCard
                  key={item._id}
                  item={item}
                />

              ))}

            </div>

          </section>

        )}


        {/* =====================================
            RECENT HIGHLIGHTS
        ===================================== */}

        {recentHighlights.length > 0 && (

          <section className="news-section">

            <h2>
              Recent Highlights & Activities
            </h2>

            <p>
              Field activities, stakeholder
              engagements, community outreach
              programmes and notable events across
              Nasarawa State.
            </p>


            <div className="grid program-grid">

              {recentHighlights.map((item) => (

                <HighlightCard
                  key={item._id}
                  item={item}
                />

              ))}

            </div>

          </section>

        )}


        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {!featuredStory &&
          latestNews.length === 0 &&
          recentHighlights.length === 0 && (

            <div className="publications-message">

              <h3>
                No News or Highlights Yet
              </h3>

              <p>
                News, announcements and agency
                activities will appear here.
              </p>

            </div>

          )}

      </div>

    </section>

  );
}


export default NewsHighlights;
