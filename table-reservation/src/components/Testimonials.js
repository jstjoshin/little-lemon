import React from 'react';
import { Tooltip } from 'react-tooltip';
import profileImgJames from '../images/profile-james.jpg';
import profileImgPriyanka from '../images/profile-priyanka.jpg';
import profileImgTim from '../images/profile-tim.jpg';
import profileImgEmma from '../images/profile-emma.jpg';
import iconStar from '../images/icon-star.png';

const StarRating = ({ rating }) => {
  return (
    <span className="star-rating" aria-label={`${rating}-star`}>
      {Array.from({ length: rating }).map((_, index) => (
      <img key={index} src={iconStar} alt="Star Icon" className="icon-star" aria-hidden="true" />
    ))}
    </span>
  );
};

const Testimonials = () => {
  const featuredTestimonials = [
    {
      id: 1,
      rating: 5,
      image: profileImgJames,
      name: "James",
      comment: "Little Lemon is a hidden gem! The flavors are bold, and the presentation is top-notch. I ordered the seafood risotto, and it was cooked to perfection. The staff was friendly and attentive, making the whole experience even better. Definitely coming back!",
    },
    {
      id: 2,
      rating: 5,
      image: profileImgPriyanka,
      name: "Priyanka",
      comment: "My husband and I had a wonderful dinner at Little Lemon! The seafood risotto was perfection. The staff went out of there way to ensure we were taken care of. I definitely recommend it if you love authentic Italian!",
    },
    {
      id: 3,
      rating: 5,
      image: profileImgTim,
      name: "Tim",
      comment: "From the moment we walked in, we felt welcomed. The pasta was fresh, and the sauces were rich without being overpowering. It’s rare to find a restaurant that nails both taste and hospitality. Will definitely be returning!",
    },
    {
      id: 4,
      rating: 4,
      image: profileImgEmma,
      name: "Emma",
      comment: "Little Lemon was great! The homemade pasta melted in my mouth, and the tiramisu was amazing! The ambiance is cozy, and the service was impeccable. A great place to find some good food without breaking the bank!",
    },
  ];

  return (
    <section className='testimonials' aria-labelledby="testimonials-heading">
      <header>
        <h1 id="testimonials-heading">Testimonials</h1>
      </header>
      <section>
        {featuredTestimonials.map((entry) => (
          <article key={entry.id} className='testimonial-card' aria-label={`Review by ${entry.name}`}>
            <span className='rating'>
              <h5>Rating</h5>
              <StarRating rating={entry.rating} />
            </span>
            <span className='profile'>
              <img src={entry.image} alt="Reviewer profile" aria-hidden="true" />
              <h5 aria-hidden="true">{entry.name}</h5>
            </span>
            <span className='description'>
              <p className="testimonial-text">{entry.comment}</p>
              <Tooltip
                anchorSelect={`#show-full-text-${entry.id}`}
                content={entry.comment}
                place="right"
                className="tooltip"
                openOnClick="true"
                closeEvents={{ click: true }}
              />
              <span id={`show-full-text-${entry.id}`} className='show-full-control' aria-label="Click for full testimonial">more</span>
            </span>
          </article>
        ))}
      </section>
    </section>
  );
};

export default Testimonials;
