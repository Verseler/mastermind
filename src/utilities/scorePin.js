const scorePins = [
  {score: "CORRECT", color: "bg-black"},
  {score: "MISPLACED", color: "bg-gray-400"},
  {score: "WRONG", color: "bg-amber-50"}
]


const getIndexOf = (score) => scorePins.findIndex(pin => pin.score == score);

const getScorePinColor = (score) => scorePins[getIndexOf(score)].color;

export { getScorePinColor };
