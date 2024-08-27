import iconDeliveroo from "../assets/deliveroo-logo.svg";

const Header = ({ data }) => {
  return (
    <>
      <header>
        <div className="top-icon">
          <div className="container">
            <img
              src={iconDeliveroo}
              className="header-logo"
              alt="Logo de Deliveroo"
            />
          </div>
        </div>

        <div className="container">
          <div className="header-title-container">
            <div>
              <>
                <h1>{data.restaurant.name}</h1>
                <p>{data.restaurant.description}</p>
              </>
            </div>

            <img src={data.restaurant.picture} alt="Idée de brunch" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
