import React from "react";
import Spinner from "../components/Spinner";
import { useEntertainmentContext } from "../contextApi/Context";
import { Card } from "../components/reuse/Card";
import { Button } from "../components/reuse/Button";

const MyProfile = () => {
  const { user, logout, loading } = useEntertainmentContext();
  if (loading) return <Spinner />;
  return (
    <div className="mx-4">
      <Card
        style={{
          padding: "20px",
          margin: "15px auto",
          maxWidth: "500px",
          textAlign: "center",
          minHeight: "80vh",
          height: "auto",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <Card
          style={{
            padding: "40px",
            marginBottom: "70px",
            background: "#f6f6f6",
          }}
        ></Card>
        <img
          src={user?.profile_picture}
          alt="User"
          style={{
            width: "100px",
            height: "100px",
            border: "5px solid #fff",
            borderRadius: "50%",
            position: "absolute",
            top: "18%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <p
          style={{
            fontSize: "18px",

            margin: "10px auto",
          }}
        >
          {user?.username}
        </p>
        <p style={{ margin: "5px auto" }}>{user?.email}</p>

        <hr style={{ margin: "20px auto", background: "#999", width: "70%" }} />

        <h3 style={{ margin: "10px auto" }}>My Orders</h3>
        <p style={{ margin: "5px auto" }}>You have placed 5 orders</p>
        <p style={{ margin: "5px auto" }}>
          Last order placed on 21st July 2021
        </p>

        <hr style={{ margin: "20px auto", background: "#999", width: "70%" }} />

        <h3 style={{ margin: "10px auto" }}>My Address</h3>
        <p style={{ margin: "5px auto" }}>
          {user?.street} {", "} {user?.city} {", "} {user?.country}
        </p>
        <p style={{ margin: "5px auto" }}>Phone: +1 {user?.number}</p>

        <Button
          className={
            "ml-2 bg-white w-full text-dark-100 drop-shadow-2xl rounded-lg mt-5 py-3"
          }
          onClick={logout}
          label={"Logout"}
        />
      </Card>
    </div>
  );
};

export default MyProfile;
