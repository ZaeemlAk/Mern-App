import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth();

  if (!services || services.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        No services available
      </h2>
    );
  }

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services.map((curElem) => {
          const { _id, price, description, provider, service } = curElem;

          return (
            <div className="card" key={_id}>
              <div className="card-img">
                <img
                  src="/images/design.png"
                  alt="our services info"
                  width="200"
                />
              </div>

              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
