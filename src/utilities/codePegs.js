const codePegs = [
  {code: "BU", color: "bg-nb-blue", number : 1},
  {code: "PK", color: "bg-nb-pink", number : 2},
  {code: "GN", color: "bg-nb-green", number : 3},
  {code: "RD", color: "bg-nb-red", number : 4},
  {code: "VL", color: "bg-violet-500", number : 5},
  {code: "OR", color: "bg-nb-orange", number : 6},
  {code: "YW", color: "bg-nb-yellow", number : 7},
]

const getIndexOf = (code) => codePegs.findIndex(peg => peg.code == code);

const getCodePegColor = (code) => {
  const index = getIndexOf(code);
  if(index == undefined || code == "") {
    return "bg-amber-50";
  }

  return codePegs[index].color;
};

const getCodePegNumber = (code) => {
  const index = getIndexOf(code);
  if(index == undefined || code == "") {
    return "";
  }

  return codePegs[index].number;
};

const getCodePegs = () => codePegs.map(peg => peg.code);

export { getCodePegs, getCodePegColor, getCodePegNumber};