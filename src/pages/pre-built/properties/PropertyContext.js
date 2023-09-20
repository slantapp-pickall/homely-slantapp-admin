import React, { useState, createContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { productCardData } from "./PropertyData";

export const PropertyContext = createContext();
const token = localStorage.getItem("accessToken");

export const ProductContextProvider = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch("https://homely-h0gx.onrender.com/v1/asset/", {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setData(data.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    }

    fetchProperties();
  }, []); // Empty dependency array to run once on component mount

  return <PropertyContext.Provider value={{ contextData: [data, setData] }}><Outlet /></PropertyContext.Provider>;
};
