const Section = ({ data }) => {
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
                        <article key={meal.id}>
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
        <div className="column-right">Hello</div>
      </div>
    </>
  );
};

export default Section;
