
const getNewBoard = (celSize) => {
  const newBoard = [];
  const EMPTY = '';


  for(let attemptNumber=1; attemptNumber <= 10; attemptNumber++) {
    const row = {
      attempt: attemptNumber,
      codeCells: Array(celSize).fill(EMPTY),
      scoreCells: Array(celSize).fill('WRONG')
    }
  
    newBoard.push(row);
  }

 
  return(newBoard);
}


export { getNewBoard };