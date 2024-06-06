import React from 'react';
import './Past.css';
import pic1 from '../icons/Picture1.png';
import pic2 from '../icons/Picture2.jpg';
import pic3 from '../icons/Picture3.jpg';
import pic4 from '../icons/Picture4.jpg';
import pic5 from '../icons/Picture5.jpg';
import pic6 from '../icons/Picture6.png';
import pic7 from '../icons/Picture7.png';

const Past = () => {
  return (
    <div className="past container-xxl bg-wheat p-0">
      <div className="container-xxl py-5">
        <div className="container py-5 px-lg-5">
          <div className="wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="text-center mb-5">Relation of Varying Rainfall with Positivity Ratio</h1>
          </div>
          <div className="row mt-n2 wow fadeInUp" data-wow-delay="0.3s"></div>
          <div className="row g-4 portfolio-container">
            <div className="col-lg-12 col-md-6 portfolio-item first wow fadeInUp" data-wow-delay="0.1s">
              <div className="rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <img id="pic1" src={pic1} alt="Picture 1" />
                </div>
              </div>
              <br />
              <br />
              <div className="wow fadeInUp" data-wow-delay="0.1s">
                <h1 className="text-center mb-5">Sentiment Analysis (2017-2022): Important Negative Words in the Tweets</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 portfolio-item first wow fadeInUp" data-wow-delay="0.1s">
              <div className="rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <img src={pic2} alt="Picture 2" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 portfolio-item second wow fadeInUp" data-wow-delay="0.3s">
              <div className="rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <img src={pic3} alt="Picture 3" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-5 px-lg-5">
          <div className="wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="text-center mb-5">Tweets with negative sentiments and elevation</h1>
          </div>
          <div className="row mt-n2 wow fadeInUp" data-wow-delay="0.3s"></div>
          <div className="row g-4 portfolio-container">
            <div className="col-lg-6 col-md-6 portfolio-item first wow fadeInUp" data-wow-delay="0.1s">
              <div className="rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <img src={pic5} alt="Picture 5" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 portfolio-item second wow fadeInUp" data-wow-delay="0.3s">
              <div className="rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <img src={pic4} alt="Picture 4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-5 px-lg-5">
          <div className="wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="text-center mb-5">Total Negative Tweets from 2017-2022 and their spatial correspondence to VGI information</h1>
          </div>
          <div className="row mt-n2 wow fadeInUp" data-wow-delay="0.3s"></div>
          <div className="row g-4 portfolio-container">
            <div className="col-lg-6 col-md-6 portfolio-item first wow fadeInUp" data-wow-delay="0.1s">
              <div className="rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <img src={pic6} alt="Picture 6" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 portfolio-item second wow fadeInUp" data-wow-delay="0.3s">
              <div className="rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <img src={pic7} alt="Picture 7" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Past;
