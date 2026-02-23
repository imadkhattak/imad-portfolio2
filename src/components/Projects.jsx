import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import Modal from './Modal';

export default function Projects({ data }) {
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('image');
  const [modalData, setModalData] = useState({});
  const { sectionHeading, allProjects } = data;
  const handelProjectDetails = (item, itemType) => {
    if (itemType === 'image') {
      setModalData(item);
    } else {
      setModalData(item);
    }
    setModalType(itemType);

    setModal(!modal);
    console.log(modalType);
  };

  return (
    <>
      <section className="project-section section gray-bg" id="project">
        <div className="container">
          <SectionHeading
            miniTitle={sectionHeading.miniTitle}
            title={sectionHeading.title}
          />
          <div
            className="row gy-4"
            data-aos="fade"
            data-aos-duration="1200"
            data-aos-delay="400"
          >
            {allProjects?.map((item, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="project-box h-100 d-flex flex-column">
                  <div className="project-media">
                    <img src={item.thumbUrl} alt="Thumb" className="w-100" />
                    <span
                      className="gallery-link"
                      onClick={() => handelProjectDetails(item, 'image')}
                    >
                      <i>
                        <Icon icon="bi:plus" />
                      </i>
                    </span>
                  </div>
                  <div className="project-body flex-grow-1 d-flex flex-column justify-content-between pt-3">
                    <div className="text w-100 mb-3 pe-0">
                      <h5>{item.title}</h5>
                      <span>{item.subTitle}</span>
                    </div>
                    <div className="d-flex justify-content-between w-100 align-items-center">
                      <a 
                        href={item.details?.url || "#"} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="px-btn px-btn-sm" 
                        style={{ padding: '8px 20px', fontSize: '14px', borderRadius: '4px' }}
                      >
                        See Demo
                      </a>
                      <div className="link mx-0 w-auto">
                        <span
                          className="p-link"
                          onClick={() => handelProjectDetails(item, 'details')}
                        >
                          <Icon icon="bi:arrow-right" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {modal && (
        <div className="mfp-wrap">
          <div className="mfp-container">
            <div className="mfp-bg" onClick={() => setModal(!modal)}></div>
            <div className="mfp-content">
              <button
                type="button"
                className="mfp-close"
                onClick={() => setModal(!modal)}
              >
                ×
              </button>
              {modalType === 'image' ? (
                <img src={modalData.thumbUrl} alt="Thumbnail" />
              ) : (
                <Modal modalData={modalData} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
