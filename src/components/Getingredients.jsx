import "../styles/GetIngredient.css";

const GetIngredient = ({ ingredientType, ingredient, onChangeIngredient }) => {
  if (!ingredient) {
    return <div>Loading...</div>;
  }

  const getCardClassName = (type) => {
    switch (type) {
      case "legume":
        return "ingredient-card-legume";
      case "feculent":
        return "ingredient-card-feculent";
      case "VPO":
        return "ingredient-card-VPO";
      case "autre":
        return "ingredient-card-autre";
      case "sauce":
        return "ingredient-card-sauce";
      case "extraLegume":
        return "ingredient-card-extraLegume";
      default:
        return "";
    }
  };

  return (
    <div className={`ingredient-card ${getCardClassName(ingredientType)}`}>
      <div className="boxGetIngredient">
        <h2 className="titreGetIngredient">{ingredient.name}</h2>
        <img
          className="imgIngredientStyle"
          src={ingredient.images}
          alt={ingredient.name}
        />
        <div className="divPrepa">
          <p className="prepaGetIngredient">{ingredient.preparation}</p>
        </div>
        <button className="buttonGetIngredient" onClick={onChangeIngredient}>
          Changer l'ingrédient
        </button>
      </div>
    </div>
  );
};

export default GetIngredient;
