import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Components/Header";
import Section from "./Components/Section";

function App() {
  // le state data servira à stocker le data reçu dans la réponse du serveur
  const [data, setData] = useState();
  // state isLoading permettant de savoir si la réponse est bien arrivé
  const [isLoading, setIsLoading] = useState(true);

  const [inTheCart, setInTheCart] = useState([]);
  //const [subtotal, setSubtotal] = useState();

  useEffect(() => {
    // utilisation d'une fonction async dans la fonction useEffect car la fonction de callback ne peut pas avoir d'async
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/");
        // stockage de la réponse du serveur dans le state data
        setData(response.data);
        // une fois arrivé ici, la réponse est arrivé donc je change la valeur du state isLoading
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur de chargement des données:", error);
      }
    };
    // J'appelle cette fonction directement après l'avoir déclarée
    fetchData();
  }, []);

  const handleAddCart = (meal) => {
    const inTheCartCopy = [...inTheCart];

    //verifie si l'article est bien présent dans le panier
    const existingItem = inTheCartCopy.find((item) => item.id === meal.id);

    // si l'article est bien dans le panier, on incrémente quantity de 1
    if (existingItem) {
      existingItem.quantity += 1;

      //sinon on l'ajoute dans le tableau
    } else {
      inTheCartCopy.push({
        id: meal.id,
        title: meal.title,
        price: meal.price,
        quantity: 1,
      });
    }

    setInTheCart(inTheCartCopy);
  };

  const handleRemoveQuantityCart = (meal, index) => {
    const inTheCartCopy = [...inTheCart];
    //verifie si l'article est bien présent dans le panier

    inTheCartCopy[index].quantity -= 1;

    //si quantity est à zéro, alors on retire l'article du panier
    if (inTheCartCopy[index].quantity === 0) {
      inTheCartCopy.splice(index, 1);
    }

    setInTheCart(inTheCartCopy);
  };

  const handleAddQuantityCart = (meal, index) => {
    const inTheCartCopy = [...inTheCart];
    //verifie si l'article est bien présent dans le panier

    inTheCartCopy[index].quantity += 1;

    setInTheCart(inTheCartCopy);
  };

  const handleSubtotalOrTotal = (cart, deliveryCosts) => {
    const prices = [];

    cart.map((item) => {
      // on convertis la valeur de la propriété price du tableau d'objet cart en Number
      let price = Number(item.price);

      // On arrondis le prix à deux chiffres après la virgule, mais toFixed reconvertis le prix en string
      let roundedPrice = price.toFixed(2);

      // on reconvertis le type en Number
      let rounded = Number(roundedPrice);

      let quantity = rounded * item.quantity;
      quantity.toFixed(2);
      if (item.quantity === 1) {
        prices.push(rounded);
      } else {
        prices.push(quantity);
      }
    });

    let result = prices.reduce((accumulator, current) => accumulator + current);

    if (!deliveryCosts) {
      // pour avoir deux nombres après la virgule
      return result.toFixed(2);
    } else {
      return (result + deliveryCosts).toFixed(2);
    }
  };
  //si la réponse n'a pas été chargé correctement, on retournera <p>loading...</p> sinon le code principal
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <Header data={data} />
      <main>
        <Section
          data={data}
          inTheCart={inTheCart}
          handleAddCart={handleAddCart}
          handleRemoveQuantityCart={handleRemoveQuantityCart}
          handleAddQuantityCart={handleAddQuantityCart}
          handleSubtotalOrTotal={handleSubtotalOrTotal}
        />
      </main>
    </>
  );
}

export default App;
