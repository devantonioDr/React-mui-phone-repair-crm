import React, { useEffect, useState } from "react";
import { RowSelectContextProvider } from "./RowSelectContext";
import { RowShowMoreContextProvider } from "./RowShowMoreContext";

export type RepairListContextValue = {
  repairs: RepairData[];
  fetchNewRepairs: () => Promise<void>;
};
export const RepairListContext = React.createContext<RepairListContextValue>(
  {} as RepairListContextValue
);

export const RepairListContextProvider = (props: any) => {
  const [repairs, setRepairs] = useState<RepairData[]>([]);

  const fetchNewRepairs = () => {
    return fetch("./api/repairs").then(async (data) => {
      let json = await data.json();
      setRepairs(json.data);
    });
  };

  useEffect(() => {
    fetchNewRepairs();
  }, []);

  const contextValue: RepairListContextValue = {
    repairs,
    fetchNewRepairs,
  };

  return (
    <RepairListContext.Provider value={contextValue}>
      
        <RowShowMoreContextProvider>
          <RowSelectContextProvider>{props.children}</RowSelectContextProvider>
        </RowShowMoreContextProvider>
      
    </RepairListContext.Provider>
  );
};
