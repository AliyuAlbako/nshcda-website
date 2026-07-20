
import estimatedBeneficiaries from "../../data/estimatedBeneficiaries";
function LgaDetailsPanel({ selectedLga }) {
  if (!selectedLga) {
    return (
      <div className="card lga-panel">
        <h2>Human Capital Development Coverage</h2>

        <p>
          Select any Local Government Area on the map to view its
          intervention coverage.
        </p>

        <div className="coverage-status success">
          ✓ Statewide Coverage
        </div>

        <p>
          NSHCDA has implemented Human Capital Development
          interventions across all thirteen (13) Local Government
          Areas of Nasarawa State.
        </p>

        <p>
          This interactive map provides a geographic overview of
          intervention coverage. As the NSHCDA Digital Platform
          evolves, programme records, beneficiary statistics and
          implementation reports will become available for each
          Local Government Area.
        </p>
      </div>
    );
  }

  const beneficiaries =
    estimatedBeneficiaries[selectedLga] || "N/A";

  return (
    <div className="card lga-panel">
      <h2>{selectedLga.toUpperCase()} LOCAL GOVERNMENT AREA</h2>

      <div className="coverage-status success">
        ✓ Intervention Implemented
      </div>

      {/* Estimated Beneficiaries */}
      <div className="lga-beneficiaries-card">
        <h3>
          {typeof beneficiaries === "number"
            ? beneficiaries.toLocaleString()
            : beneficiaries}+
        </h3>

        <span>Citizens Impacted</span>
      </div>

      <p>
        NSHCDA has implemented Human Capital Development
        interventions within this Local Government Area as part of
        its statewide commitment to improving health, education,
        youth empowerment, labour force development and social
        development.
      </p>

      <p>
        Based on the Agency's current statewide impact, this Local
        Government Area is estimated to have reached approximately{" "}
        <strong>
          {typeof beneficiaries === "number"
            ? beneficiaries.toLocaleString()
            : beneficiaries}
        </strong>{" "}
        beneficiaries through various Human Capital Development
        interventions.
      </p>

      {/* <small
        style={{
          display: "block",
          marginTop: "1rem",
          color: "#667085",
          fontStyle: "italic",
        }}
      >
        * Beneficiary figures shown are presentation estimates and
        will be replaced with official NSHCDA records as they become
        available.
      </small> */}
    </div>
  );
}

export default LgaDetailsPanel;