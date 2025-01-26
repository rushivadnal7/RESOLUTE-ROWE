import React from 'react'
import TestimonialWrapper from '../../wrappers/Testimonials'
import harsh_bhoir_stoicism from '../../assets/testimonials_assets/harsh_bhoir_stoicism.jpg'
import kaushik_gadipelly_zoro from '../../assets/testimonials_assets/kaushik_gadipelly_zoro.jpg'
import gaurav_jain_stoicism from '../../assets/testimonials_assets/gaurav_jain_stoicism.jpg'

const Testimonials = () => {

  return (

    <TestimonialWrapper>
      <h6>Why People Love Us</h6>
      <div class="container">
        <div class="flex-wrap">
          <div class="card">
            <img src={harsh_bhoir_stoicism} alt="blog" />
            <div class="content">
              <h2 class="category">harsh bhoir</h2>
              <h1 class="title">STOICISM</h1>
              <p class="description">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
              <div class="info">
                <span class="views"><svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>1.2K</span>
                <span class="comments"><svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>6</span>
              </div>
            </div>
          </div>
          <div class="card">
            <img src={kaushik_gadipelly_zoro} alt="blog" />
            <div class="content">
              <h2 class="category">Kaushik Gadipelly</h2>
              <h1 class="title">ZORO</h1>
              <p class="description">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
              <div class="info">
                <span class="views">
                  <svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  1.2K
                </span>
                <span class="comments">
                  <svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                  6
                </span>
              </div>
            </div>
          </div>

          <div class="card">
            <img src={gaurav_jain_stoicism} alt="blog" />
            <div class="content">
              <h2 class="category">gaurav jain</h2>
              <h1 class="title">STOICISM</h1>
              <p class="description">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
              <div class="info">
                {/* <a class="learn-more">Learn More
                  <svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a> */}
                <span class="views"><svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>1.2K</span>
                <span class="comments"><svg class="icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>6</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TestimonialWrapper>

  )
}

export default Testimonials