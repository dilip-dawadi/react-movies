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
        }}
      >
        <div
          style={{
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
            src={"/person-svg.svg"}
            alt="User"
            style={{
              width: "100px",
              height: "100px",
              padding: "6px",
              border: "5px solid #fff",
              borderRadius: "50%",
              position: "absolute",
              bottom: "-30%",
              left: "50%",
              transform: "translate(-50%, 30%)",
            }}
          />
        </div>
        <div
          style={{
            fontSize: "18px",
            margin: "10px auto 10px auto",
          }}
        >
          {user?.username}
        </div>
        <p style={{ margin: "5px auto" }}>{user?.email}</p>
        <hr style={{ margin: "20px auto", background: "#999", width: "70%" }} />
        <Button
          className={
            "bg-white w-[70%] text-dark-100 drop-shadow-2xl rounded-lg py-3"
          }
          onClick={() => {}}
          label={"Change Password"}
        />
        <hr style={{ margin: "20px auto", background: "#999", width: "70%" }} />
        <h3 style={{ margin: "10px auto" }}>My Address</h3>
        <p style={{ margin: "5px auto" }}>
          {user?.street} {", "} {user?.city} {", "} {user?.country}
        </p>
        <p style={{ margin: "5px auto" }}>Phone: +1 {user?.number}</p>
        <hr style={{ margin: "20px auto", background: "#999", width: "70%" }} />
        <Button
          className={
            "bg-white w-[70%] text-dark-100 drop-shadow-2xl rounded-lg py-3"
          }
          onClick={logout}
          label={"Logout"}
        />
      </Card>
    </div>
  );
};

export default MyProfile;
