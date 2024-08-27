import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Components/Header";
import Section from "./Components/Section";

function App() {
  // le state data servira à stocker le data reçu dans la réponse du serveur
  const [data, setData] = useState([]);
  // state isLoading permettant de savoir si la réponse est bien arrivé
  const [isLoading, setIsLoading] = useState(true);
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

  //si la réponse n'a pas été chargé correctement, on retournera <p>loading...</p> sinon le code principal
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <Header data={data} />
      <main>
        <Section data={data} />
      </main>
    </>
  );
}

export default App;
