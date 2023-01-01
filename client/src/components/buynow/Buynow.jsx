import { Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import Option from "./Option";
import Subtotal from "./Subtotal";
import Right from "./Right";
import "./buynow.css";
const Buynow = () => {
  const [cartdata, setCartdata] = useState("");
  // console.log(cartdata.length);
  const getdatabuy = async () => {
    const res = await fetch("/cartdetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    // console.log(data.carts);
    if (res.status !== 201) {
      alert("no data available");
    } else {
      // console.log("data cart main hain");
      setCartdata(data.carts);
    }
  };

  useEffect(() => {
    getdatabuy();
  }, []);

  return (
    <>
      {cartdata.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select all items</p>
              <span className="leftbuyprice">Price</span>
              <Divider />
              {cartdata.map((e, i) => {
                return (
                  <>
                    <div className="item_containert">
                      <img src={e.detailUrl} alt="Cart Image" />
                      <div className="item_details">
                        <h3>{e.title.longTitle}</h3>
                        <h3>{e.title.shortTitle}</h3>
                        <h3 className="diffrentprice">{e.price.cost}</h3>
                        <p className="unusuall">
                          Usualy dispatched in three days
                        </p>
                        <p>Eligible for free shipping</p>
                        <img
                          src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                          alt="logo"
                        />
                        <Option deletedata={e.id} get={getdatabuy} />
                      </div>
                      <h3 className="item_price">₨{e.price.cost}</h3>
                    </div>
                  </>
                );
              })}

              <Divider />
              <Subtotal item={cartdata} />
            </div>
            <Right item={cartdata} />
          </div>
        </div>
      ) : (
        <div className="buynow_section">
          <div className="buynow_container">
            <h1>Your Basket Is Empty</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Buynow;
