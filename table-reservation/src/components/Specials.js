import React from 'react';
import { NavLink } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import imageGreekSalad from '../images/food-greek-salad.jpg';
import imageBrushetta from '../images/food-bruschetta.jpg';
import imageLemonDesert from '../images/food-lemon-dessert.jpg';
import iconDeliveryBike from '../images/icon-bicycle.svg';

const Specials = ({noClick}) => {
  const featuredItems = [
    {
      id: 1,
      title: "Greek Salad",
      image: imageGreekSalad,
      price: "$12.99",
      description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    },
    {
      id: 2,
      title: "Brushetta",
      image: imageBrushetta,
      price: "$7.99",
      description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    },
    {
      id: 3,
      title: "Lemon Dessert",
      image: imageLemonDesert,
      price: "$6.99",
      description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    },
  ];

  return (
    <section className='specials' aria-labelledby="specials-heading">
      <header>
        <h1 id="specials-heading">This weeks specials!</h1>
        <NavLink to="/menu" aria-label="View full online menu" className="btn-link" role="button" onClick={noClick} aria-describedby="disabled-description">Online Menu</NavLink>
      </header>
      <section>
        {featuredItems.map((item) => (
          <article key={item.id} aria-labelledby={`title-${item.id}`} aria-describedby={`desc-${item.id}`}>
            <img src={item.image} alt={item.title} />
            <section className='item-details'>
              <header>
                <h5 id={`title-${item.id}`}>{item.title}</h5>
                <p className='item-price'>{item.price}</p>
              </header>
              <p id={`desc-${item.id}`}>{item.description}</p>
              <Tooltip
                anchorSelect={`#show-meal-text-${item.id}`}
                content={item.description}
                place="right"
                className="tooltip"
                openOnClick="true"
                closeEvents={{ click: true }}
              />
              <span id={`show-meal-text-${item.id}`} className='show-full-control' aria-label="Click for full meal description">more</span>
              <NavLink to="/order" aria-label={`Order ${item.title} for delivery`} role="button" onClick={noClick} aria-describedby="disabled-description">
                <span aria-hidden="true">Order a delivery</span>
                <img src={iconDeliveryBike} alt="Delivery icon" aria-hidden="true" />
              </NavLink>
            </section>
          </article>
        ))}
      </section>
    </section>
  );
};

export default Specials;
