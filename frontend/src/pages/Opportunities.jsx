import { useMemo, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import OpportunityCard from "../components/opportunities/OpportunityCard";
import OpportunityFilters from "../components/opportunities/OpportunityFilters";
import opportunities from "../data/opportunities";

function Opportunities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const categories = [...new Set(opportunities.map((item) => item.category))];

  const featuredOpportunities = opportunities.filter((item) => item.featured);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = category ? item.category === category : true;
      const matchesStatus = status ? item.status === status : true;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, category, status]);

  return (
    <section className="page-section">
      <div className="container">
        <div className="opportunities-hero">
          <h1>Opportunities Portal</h1>
          <p>
            Explore jobs, internships, trainings, grants, scholarships, and
            empowerment opportunities across NSHCDA’s thematic areas.
          </p>
        </div>

        <SectionTitle
          title="Featured Opportunities"
          subtitle="Highlighted opportunities currently open for application."
        />

        <div className="grid program-grid">
          {featuredOpportunities.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>

        <div style={{ marginTop: "3rem" }}>
          <SectionTitle
            title="Browse All Opportunities"
            subtitle="Search and filter opportunities by category and status."
          />

          <OpportunityFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            category={category}
            setCategory={setCategory}
            status={status}
            setStatus={setStatus}
            categories={categories}
          />

          <div className="grid program-grid" style={{ marginTop: "2rem" }}>
            {filteredOpportunities.length > 0 ? (
              filteredOpportunities.map((item) => (
                <OpportunityCard key={item.id} item={item} />
              ))
            ) : (
              <p>No opportunities found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Opportunities;