import React, { useState } from "react";

const InputChip = () => {
  const [inputText, setInputText] = useState("");
  const [chips, setChips] = useState([]);

  const handleKeyDown = (e) => {
    console.log("click me");
    if (e.key === "Enter" && inputText.trim() !== "") {
      setChips((prev) => [...prev, inputText]);
      setInputText("");
    }
  };
  const handleDeleteChip = (index) => {
    let copyChips = [...chips];
    copyChips.splice(index, 1);
    setChips(copyChips);
  };
  return (
    <div>
      <h2>Chip Input</h2>
      <input
        type="text"
        placeholder="chips typing...."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <div>
        {chips.map((chip, index) => (
          <div
          key={index}
            style={{
              background: "gray",
              color: "white",
              margin: "5px",
              padding: "5px",
            }}
          >
            {chip}
            <button
              style={{ color: "red" }}
              onClick={() => handleDeleteChip(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputChip;
