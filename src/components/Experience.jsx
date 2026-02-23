import React from 'react';
import SectionHeading from './SectionHeading';

export default function Experience({ data }) {
  const { sectionHeading, allExperience } = data;

  return (
    <section className="section gray-bg">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="timeline-container relative" style={{ position: 'relative' }}>
              {/* Vertical Line */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '20px', 
                  top: '0', 
                  bottom: '0', 
                  width: '3px', 
                  background: 'rgba(255, 255, 255, 0.4)',
                  zIndex: '0'
                }} 
              />
              
              {allExperience?.map((item, index) => {
                // Split the description by newlines and create a bullet points array
                const bulletPoints = item.companyDescription.split('\n').filter(point => point.trim() !== '');
                
                return (
                <div
                  className="timeline-item"
                  key={index}
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay={index * 100}
                  style={{ position: 'relative', paddingLeft: '60px', marginBottom: '40px' }}
                >
                  {/* Timeline Dot */}
                  <div 
                    style={{
                      position: 'absolute',
                      left: '11px',
                      top: '24px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'var(--px-theme)',
                      border: '4px solid var(--px-black)',
                      zIndex: '1'
                    }}
                  />
                  
                  <div className="ex-box rounded" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '30px' }}>
                    <div className="d-flex align-items-center mb-3">
                      <span className="badge" style={{ background: 'var(--px-white)', color: 'var(--px-black)', padding: '6px 12px', borderRadius: '30px', fontWeight: '700', marginRight: '15px' }}>
                        {item.jobType}
                      </span>
                      <span style={{ color: 'var(--px-text)', fontSize: '14px', fontWeight: '500' }}>• {item.duration}</span>
                    </div>
                    
                    <h4 style={{ color: 'var(--px-white)', fontWeight: '600', marginBottom: '10px' }}>{item.designation}</h4>
                    
                    <div className="d-flex mb-4" style={{ color: 'var(--px-text)', fontSize: '15px' }}>
                      <span className="me-3"><i className="bi bi-building me-2"></i>{item.company.split('|')[0].trim()}</span>
                      <span><i className="bi bi-geo-alt me-2"></i>{item.company.split('|')[1] ? item.company.split('|')[1].trim() : ''}</span>
                    </div>
                    
                    <ul style={{ color: 'var(--px-white)', opacity: '0.8', lineHeight: '1.7', paddingLeft: '20px', margin: '0' }}>
                      {bulletPoints.map((point, i) => (
                        <li key={i} style={{ marginBottom: '8px' }}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
