import React from 'react';
import { NavLink } from "react-router-dom";
import imageGreekSalad from '../images/food-greek-salad.jpg';
import imageBrushetta from '../images/food-bruschetta.jpg';
import imageLemonDesert from '../images/food-lemon-dessert.jpg';
import iconDeliveryBike from '../images/icon-bicycle.svg';

const Specials = () => {
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
        <NavLink to="/menu" aria-label="View full online menu" >Online Menu</NavLink>
      </header>
      <section>
        {featuredItems.map((item) => (
          <article key={item.id} aria-labelledby={`title-${item.id}`} aria-describedby={`desc-${item.id}`}>
            <img src={item.image} alt={item.title} />
            <h5 id={`title-${item.id}`}>{item.title}</h5>
            <p>{item.price}</p>
            <p id={`desc-${item.id}`}>{item.description}</p>
            <NavLink to="/order" aria-label={`Order ${item.title} for delivery`} role="button">
              <span aria-hidden="true">Order a delivery</span>
              <img src={iconDeliveryBike} alt="Delivery icon" aria-hidden="true" />
            </NavLink>
          </article>
        ))}
      </section>
    </section>
  );
};

export default Specials;
