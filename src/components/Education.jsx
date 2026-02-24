import React from "react";
import SectionHeading from "./SectionHeading";

export default function Education({ data }) {
  const { sectionHeading, allEducation } = data;

  return (
    <section className="section" id="education">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <div className="row">
          {allEducation?.map((item, index) => (
            <div
              className="col-md-6 col-lg-4 m-15px-tb"
              key={index}
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay={index * 100}
            >
              <div
                className="feature-box-01 rounded"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "30px",
                  height: "100%",
                }}
              >
                <div
                  className="icon"
                  style={{
                    color: "var(--px-theme)",
                    fontSize: "40px",
                    marginBottom: "20px",
                  }}
                >
                  <i
                    className={
                      item.type === "Education"
                        ? "bi bi-mortarboard"
                        : "bi bi-patch-check"
                    }
                  ></i>
                </div>
                <div className="feature-content">
                  <span
                    className="badge mb-2"
                    style={{
                      background: "var(--px-theme)",
                      color: "var(--px-white)",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                    }}
                  >
                    {item.duration}
                  </span>
                  <h5
                    style={{
                      color: "var(--px-white)",
                      fontWeight: "600",
                      marginTop: "10px",
                    }}
                  >
                    {item.degree}
                  </h5>
                  <p
                    style={{
                      color: "var(--px-white)",
                      opacity: "0.7",
                      fontSize: "14px",
                      marginBottom: "0",
                    }}
                  >
                    {item.institute}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
