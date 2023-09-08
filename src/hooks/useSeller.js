import { useState } from "react";

const useSeller = (user) => {
  const [seller, setSeller] = useState(false);
  const email = user?.email;
  const [sellerLoading, setSellerLoading] = useState(true);

  //check seller by api
  if (email) {
    fetch(`http://localhost:5000/check-seller?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setSellerLoading(false);
        if (data.seller) {
          setSeller(data.seller);
        }
        console.log(data);
      });
  }
  return [seller, sellerLoading];
};

export default useSeller;
