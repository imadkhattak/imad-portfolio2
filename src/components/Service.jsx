import { Icon } from '@iconify/react';
import React from 'react';
import SectionHeading from './SectionHeading';
import Ratings from './Ratings';

export default function Service({ data }) {
  const { sectionHeading, allService } = data;
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <div className="row gy-5">
          {allService?.map((item, index) => (
            <div className="col-sm-6 col-lg-3" key={index}>
              <div
                className="services-box-icon"
                style={{
                  background: 'rgba(var(--px-theme-rgb), 0.1)',
                  borderRadius: '10px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay={index * 100}
              >
                <div 
                  className="icon-container" 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '20px',
                    borderRadius: '50%',
                    background: 'rgba(var(--px-theme-rgb), 0.1)'
                  }}
                >
                  <Icon icon={item.icon} style={{ fontSize: '40px', color: 'var(--px-theme)' }} />
                </div>
                <h5 style={{ color: 'var(--px-white)', marginBottom: '15px' }}>{item.title}</h5>
                <p style={{ color: 'var(--px-white)', opacity: 0.7, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
