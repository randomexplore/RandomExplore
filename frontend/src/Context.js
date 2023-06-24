import React, { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [conimuli, setconimuli] = useState(null);
  const [conCateentidttl, setconCateentidttl] = useState(null);
  const [conCatecokidttl, setconCatecokidttl] = useState(null);
  const [conCatefinidttl, setconCatefinidttl] = useState(null);
  const [conCaterandexidttl, setconCaterandexidttl] = useState(null);
  const [conCatetraidttl, setconCatetraidttl] = useState(null);
  const [conCatetecidttl, setconCatetecidttl] = useState(null);
  
  const funconimuli = (newData) => {
    setconimuli(newData);
  };const funconCateentidttl = (newData) => {
    setconCateentidttl(newData);
  }; const funconCatecokidttl = (newData) => {
    setconCatecokidttl(newData);
  }; const funconCatefinidttl = (newData) => {
    setconCatefinidttl(newData);
  }; const funconCaterandexidttl = (newData) => {
    setconCaterandexidttl(newData);
  }; const funconCatetraidttl = (newData) => {
    setconCatetraidttl(newData);
  }; const funconCatetecidttl = (newData) => {
    setconCatetecidttl(newData);
  };

  const [Cateptsul, setCateptsul] = useState(null)
const [Catetrapts,setCatetraptsul] = useState(null)
const [Catecokpts,setCatecokptsul] = useState(null)
const [Catefinpts,setCatefinptsul] = useState(null)
const [Catetecpts,setCatetecptsul] = useState(null)

  const funconcateptsul = (newData) => { 
    setCateptsul(newData);
  };
  const funconcatetraptsul = (newData) => {
    setCatetraptsul(newData);
  };
  const funconcatecokptsul = (newData) => {
    setCatecokptsul(newData);
  };const funconcatefinptsul = (newData) => {
    setCatefinptsul(newData);
  };const funconcatetecptsul = (newData) => {
    setCatetecptsul(newData);
  };
  return (
    <DataContext.Provider value={{ conimuli,conCateentidttl,conCatecokidttl,conCatefinidttl,
    conCaterandexidttl,conCatetraidttl,conCatetecidttl,
    funconimuli,funconCateentidttl,funconCatecokidttl,
    funconCatefinidttl,funconCaterandexidttl,funconCatetraidttl,
    funconCatetecidttl , Cateptsul , funconcateptsul ,Catetrapts ,
    funconcatetraptsul,Catecokpts,funconcatecokptsul,Catefinpts,
    funconcatefinptsul,Catetecpts,funconcatetecptsul}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;