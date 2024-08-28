const Section = ({
  data,
  inTheCart,
  handleAddCart,
  handleRemoveQuantityCart,
  handleSubtotalOrTotal,
  handleAddQuantityCart,
}) => {
  return (
    <>
      <div className="container">
        <div className="column-left">
          {data.categories.map((category) => {
            // console.log(category.meals.length);
            if (category.meals.length !== 0) {
              return (
                <section key={category.name}>
                  <h2>{category.name}</h2>
                  <div className="meals-container">
                    {category.meals.map((meal) => {
                      return (
                        <article
                          key={meal.id}
                          onClick={() => {
                            handleAddCart(meal);
                          }}
                        >
                          <div>
                            <h3>{meal.title}</h3>
                            <p className="description">{meal.description}</p>
                            <div className="popular-price">
                              <p>{meal.price} €</p>
                              {meal.popular && <p>Populaire</p>}
                            </div>
                          </div>
                          {meal.picture && (
                            <img src={meal.picture} alt={meal.title} />
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            }
          })}
        </div>
        <div className="cart-container">
          <div className="column-right">
            <p className={inTheCart.length !== 0 ? "full" : "empty"}>
              Valider mon panier
            </p>

            {inTheCart.length !== 0 ? (
              <>
                {inTheCart.map((elem, index) => {
                  return (
                    <ol key={index} className="cart-list">
                      <li>
                        <button
                          onClick={() => {
                            handleRemoveQuantityCart(elem, index);
                          }}
                        >
                          {" "}
                          -{" "}
                        </button>
                        <span>{elem.quantity}</span>
                        <button
                          onClick={() => {
                            handleAddQuantityCart(elem, index);
                          }}
                        >
                          {" "}
                          +{" "}
                        </button>
                        <span className="meal-cart">{elem.title}</span>
                        <span className="price-cart">{elem.price} €</span>
                      </li>
                    </ol>
                  );
                })}
                <div className="subtotal">
                  <span>Sous-total </span>
                  <span className="price-cart">
                    {handleSubtotalOrTotal(inTheCart)}
                  </span>
                  <span>Frais de livraison</span>
                  <span className="price-cart">2.50 €</span>
                </div>
                <div className="total">
                  <span>Total</span>
                  <span className="price-cart">
                    {handleSubtotalOrTotal(inTheCart, 2.5)}
                  </span>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <p>Votre panier est vide</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Section;
