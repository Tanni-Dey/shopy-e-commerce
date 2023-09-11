import { Link } from "react-router-dom";
import { auth } from "../../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useGetUserOrdersQuery } from "../../../redux/api/ApiSlice";

const OrderList = () => {
  const [user] = useAuthState(auth);
  const { data: userOrders } = useGetUserOrdersQuery(user?.email, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  return (
    <div className="container mx-auto">
      {userOrders?.length !== 0 ? (
        <table className="table table-xs">
          <thead>
            <tr>
              <th>order Id</th>
              <th>Address 1</th>
              <th>Address 2</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          {userOrders?.map((order) => (
            <tbody key={order._id}>
              <tr>
                <td>{order?._id}</td>
                <td>{order?.address1}</td>
                <td>{order?.address2}</td>
                <td>{order?.user}</td>
                <td>{order?.phone}</td>
                <td>${order?.totalAmount}</td>
                <td>
                  <Link to={`/dashboard/payment/${order?._id}`}>
                    <button className="btn btn-primary btn-xs mr-3">pay</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <h2 className="text-center text-primary font-bold text-2xl">
          Haven't Your Order
        </h2>
      )}
    </div>
  );
};

export default OrderList;
