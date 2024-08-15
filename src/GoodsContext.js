import React, { createContext, useContext, useState } from "react";

const GoodsContext = createContext();

export const GoodsProvider = ({ children }) => {
  const [goods, setGoods] = useState([]);

  return (
    <GoodsContext.Provider value={{ goods, setGoods }}>
      {children}
    </GoodsContext.Provider>
  );
};

export const useGoods = () => useContext(GoodsContext);
