import jsPDF from "jspdf";
import { useState, useEffect } from "react";
import GetIngredient from "../components/Getingredients";
import listIngredients from "../assets/data";
import "../styles/Salades.css";

const Salades = () => {
  const [ingredients, setIngredients] = useState({
    legume: null,
    feculent: null,
    VPO: null,
  });
  const [bonusIngredient, setBonusIngredient] = useState(null);
  const [sauce, setSauce] = useState(null);

  useEffect(() => {
    loadInitialIngredients();
  }, []);

  const getIngredient = (type) => {
    const filteredIngredients = listIngredients.filter(
      (ingredient) => ingredient.type === type
    );
    return filteredIngredients[
      Math.floor(Math.random() * filteredIngredients.length)
    ];
  };

  const loadInitialIngredients = () => {
    setIngredients({
      legume: getIngredient("legume"),
      feculent: getIngredient("feculent"),
      VPO: getIngredient("VPO"),
    });
  };

  const handleChangeIngredient = (type) => {
    const filteredIngredients = listIngredients.filter(
      (ingredient) =>
        ingredient.type === type && ingredient.id !== ingredients[type].id
    );
    const randomIngredient =
      filteredIngredients[
        Math.floor(Math.random() * filteredIngredients.length)
      ];

    setIngredients((prevIngredients) => ({
      ...prevIngredients,
      [type]: randomIngredient,
    }));
  };

  // ---------------------- JS PDF ----------------------
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Ma salade équilibrée", 70, 20);
    doc.setLineWidth(0.5);

    doc.line(10, 25, 200, 25); // (x1, y1, x2, y2)

    // légume
    doc.setFontSize(12);
    const legumeText =
      "Légume : " + (ingredients.legume ? ingredients.legume.name : "N/A");
    doc.text(legumeText, 60, 55);
    doc.addImage(
      ingredients.legume ? ingredients.legume.images : "JPEG",
      20,
      40,
      35,
      25
    );

    // féculent
    const feculentText =
      "Féculent : " +
      (ingredients.feculent ? ingredients.feculent.name : "N/A");
    doc.text(feculentText, 60, 85);
    doc.addImage(
      ingredients.feculent ? ingredients.feculent.images : "JPEG",
      20,
      70,
      35,
      25
    );

    // VPO
    const VPOText =
      "Protéine : " + (ingredients.VPO ? ingredients.VPO.name : "N/A");
    doc.text(VPOText, 60, 115);
    doc.addImage(
      ingredients.VPO ? ingredients.VPO.images : "JPEG",
      20,
      100,
      35,
      25
    );

    if (bonusIngredient) {
      const text = "Ingrédient bonus : " + bonusIngredient.name;
      doc.text(text, 60, 145);
      doc.addImage(
        bonusIngredient ? bonusIngredient.images : "JPEG",
        20,
        130,
        35,
        25
      );
    }
    if (sauce) {
      const text = "Sauce : " + sauce.name;
      doc.text(text, 60, 175);
      doc.addImage(sauce ? sauce.images : "JPEG", 20, 160, 35, 25);
    }

    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25); // (x1, y1, x2, y2)

    doc.text("Conseils pour une salade parfaitement équilibrée :", 20, 200);
    doc.text("- 50% de légumes", 20, 210);
    doc.text("- 1 à 2 càs d'huile", 20, 215);
    doc.text("- 1 à 2 càs d'huile", 20, 220);

    doc.setFontSize(8);
    doc.text("Générateur de salades équilibrées by EasyDiet", 20, 280);

    doc.save("Ma_salade_equilibree.pdf");
  };
  // -----------------------------------------------------

  const handleAddBonusIngredient = () => {
    setBonusIngredient(getIngredient("autre"));
  };

  const handleRemoveBonusIngredient = () => {
    setBonusIngredient(null);
  };

  const handleAddSauce = () => {
    setSauce(getIngredient("sauce"));
  };

  const handleRemoveSauce = () => {
    setSauce(null);
  };

  return (
    <div className="generate">
      {/* <h1 className="titlePage">
        Bienvenue sur le générateur de salades équilibrées
      </h1> */}
      <div className="boxSalades">
        <GetIngredient
          ingredientType="legume"
          ingredient={ingredients.legume}
          onChangeIngredient={() => handleChangeIngredient("legume")}
        />
        <GetIngredient
          ingredientType="feculent"
          ingredient={ingredients.feculent}
          onChangeIngredient={() => handleChangeIngredient("feculent")}
        />
        <GetIngredient
          ingredientType="VPO"
          ingredient={ingredients.VPO}
          onChangeIngredient={() => handleChangeIngredient("VPO")}
        />
        {bonusIngredient && (
          <GetIngredient
            ingredientType="autre"
            ingredient={bonusIngredient}
            onChangeIngredient={handleAddBonusIngredient}
          />
        )}
        {sauce && (
          <GetIngredient
            ingredientType="sauce"
            ingredient={sauce}
            onChangeIngredient={handleAddSauce}
          />
        )}
      </div>
      <div className="divButton">
        {bonusIngredient ? (
          <button onClick={handleRemoveBonusIngredient}>
            Supprimer l'ingrédient bonus
          </button>
        ) : (
          <button onClick={handleAddBonusIngredient}>
            Ajouter un ingrédient bonus
          </button>
        )}
        {sauce ? (
          <button onClick={handleRemoveSauce}>Supprimer la sauce</button>
        ) : (
          <button onClick={handleAddSauce}>Ajouter une sauce</button>
        )}
      </div>
      <div>
        <button onClick={generatePDF}>Télécharger la salade</button>
      </div>
      <div>
        <p>
          Quelques principes à connaitre pour réaliser une salade équilibrée :{" "}
        </p>
        <p>50% de légumes. 1 à 2 cuillères à soupe d'huile pour la sauce.</p>
      </div>
    </div>
  );
};

export default Salades;
