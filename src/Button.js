import React from "react";


export default function Button({ label, onClick, type }) {
  return (
    <button className={`btn ${type}`} onClick={() => onClick(label)}>
      {label}
    </button>
  );
}