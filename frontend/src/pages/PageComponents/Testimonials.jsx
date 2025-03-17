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
            </div>
          </div>
          <div class="card">
            <img src={kaushik_gadipelly_zoro} alt="blog" />
            <div class="content">
              <h2 class="category">Kaushik Gadipelly</h2>
              <h1 class="title">ZORO</h1>
              <p class="description">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
            </div>
          </div>

          <div class="card">
            <img src={gaurav_jain_stoicism} alt="blog" />
            <div class="content">
              <h2 class="category">gaurav jain</h2>
              <h1 class="title">STOICISM</h1>
              <p class="description">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
            </div>
          </div>
        </div>
      </div>
    </TestimonialWrapper>

  )
}

export default Testimonials