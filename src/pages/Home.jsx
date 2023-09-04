import bannerImg from "../assets/hero-img.png";

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 items-center">
        <div>
          <p className="text-gray-600">New Arrivals 2023</p>
          <h2 className="text-8xl font-semibold my-8">
            The Clothing Collection
          </h2>
          <button className="btn btn-primary">Shop Now</button>
        </div>
        <div>
          <img src={bannerImg} alt="ing" />
        </div>
      </div>
    </div>
  );
};

export default Home;
