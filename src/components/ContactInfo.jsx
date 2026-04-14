import React from 'react';
import { Icon } from '@iconify/react';

export default function ContactInfo({ contactInfoData }) {
  return (
    <div className="contact-info">
      {contactInfoData.map((item, index) => (
        <div
          className="contact-info-in"
          key={index}
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay={index * 100}
        >
          <label>{item.title}</label>
          <div className="d-flex align-items-center">
            <span className="me-2 text-theme" style={{ fontSize: '20px', display: 'flex' }}>
              {item.email && <Icon icon="material-symbols:mail-outline" />}
              {item.tel && <Icon icon="material-symbols:call-outline" />}
            </span>
            {item.email && <a href={`mailto:${item.email}`}>{item.email}</a>}
            {item.tel && <a href={`tel:${item.tel}`}>{item.tel}</a>}
          </div>
        </div>
      ))}
    </div>
  );
}

