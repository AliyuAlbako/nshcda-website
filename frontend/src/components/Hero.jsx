// import { Link } from "react-router-dom";

// function Hero() {
//   return (
//     <section className="hero">
//       <div className="container hero-content">
//         <h1>Advancing Human Capital Development in Nasarawa State</h1>
//         <p>
//           Strengthening health, education, youth empowerment, social
//           development, labour force growth, and community development for a more
//           productive future.
//         </p>
//         <div className="hero-buttons">
//           <Link to="/programs" className="btn">
//             Explore Our Programs
//           </Link>
//           <Link to="/about" className="btn btn-outline">
//             Learn About NSHCDA
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-flex">
        
        {/* LEFT CONTENT */}
        <div className="hero-content">
          <h1 style={{lineHeight: "3rem", fontSize: "2.2rem"}}>
          Nasarawa State Human Capital Development Agency
          </h1><span style={{marginBottom: "16px"}}> Advancing Human Capital Development in Nasarawa State</span>

          <p>
            NSHCDA drives strategic interventions across health, education,
            youth empowerment, labour force development, and community
            development to improve the quality of life for all citizens.
          </p>

          <div className="hero-buttons">
            <a href="/programs" className="btn">
              Explore Programs
            </a>

            <a href="/media" className="btn btn-outline">
              View Media & History
            </a>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hero-image">
          <img src="/images/hero4.jpg" alt="NSHCDA Event" />
        </div>

      </div>
    </section>
  );
}

export default Hero;