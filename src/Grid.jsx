import React, { useState } from "react";

const Grid = () => {
  const EMPTY = 0;
  const codingPegs = [1, 2, 3, 4, 5, 6];
  const [selectedCodingPeg, setSelectedCodingPeg] = useState(codingPegs[0]);

  const [gridValues, setGridValues] = useState([
    [EMPTY, EMPTY, EMPTY, EMPTY], //each of these arrays are called guessRow
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
  ]);

  const handleButtonClick = (rI, cI) => {
    const newGridValues = [...gridValues];
    newGridValues[rI][cI] =
      newGridValues[rI][cI] === EMPTY ? selectedCodingPeg : EMPTY;
    setGridValues(newGridValues);
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "5px",
        }}
      >
        {gridValues.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((col, colIndex) => (
              <button
                key={colIndex}
                onClick={() => handleButtonClick(rowIndex, colIndex)}
              >
                {col}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
