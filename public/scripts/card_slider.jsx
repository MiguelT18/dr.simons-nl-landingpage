import React from "react";

// TODO: Estilizar los cards
const OpinionCard = ({ opinionText, userName, userAccount }) => {
  return (
    <div className="opinion-card">
      {/* <img src={imgSrc} alt="User Image" /> */}
      <p className="opinion-card-text">{opinionText}</p>
      <h3 className="opinion-card-name">{userName}</h3>
      <span className="opinion-card-username">{userAccount}</span>
    </div>
  );
};

export default OpinionCard;
