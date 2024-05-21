function findClosestResult(numbers, target) {
    let closestResult = null;
    let closestDifference = Infinity;
    let bestOperations = [];
  
    function backtrack(currentValue, remainingNumbers, operations) {
      const currentDifference = Math.abs(target - currentValue);
  
      // Si la diferencia actual es menor que la diferencia más cercana almacenada
      if (currentDifference < closestDifference) {
        closestDifference = currentDifference;
        closestResult = currentValue;
        bestOperations = [...operations];
      }
  
      // Si no hay más números que procesar, retornamos
      if (remainingNumbers.length === 0) {
        return;
      }
  
      // Intentar todas las combinaciones posibles con las operaciones
      for (let i = 0; i < remainingNumbers.length; i++) {
        const newRemainingNumbers = remainingNumbers.slice(0, i).concat(remainingNumbers.slice(i + 1));
  
        // Suma
        backtrack(currentValue + remainingNumbers[i], newRemainingNumbers, [...operations, `${currentValue} + ${remainingNumbers[i]} = ${currentValue + remainingNumbers[i]}`]);
        // Resta
        if (currentValue - remainingNumbers[i] > 0){
            backtrack(currentValue - remainingNumbers[i], newRemainingNumbers, [...operations, `${currentValue} - ${remainingNumbers[i]} = ${currentValue - remainingNumbers[i]}`]);
        }
        // Multiplicación
        backtrack(currentValue * remainingNumbers[i], newRemainingNumbers, [...operations, `${currentValue} * ${remainingNumbers[i]} = ${currentValue * remainingNumbers[i]}`]);
        // División entera (solo si el divisor no es 0 y la división es exacta)
        if (remainingNumbers[i] !== 0 && Number.isInteger(currentValue / remainingNumbers[i])) {
          backtrack(Math.floor(currentValue / remainingNumbers[i]), newRemainingNumbers, [...operations, `${currentValue} / ${remainingNumbers[i]} = ${Math.floor(currentValue / remainingNumbers[i])}`]);
        }
      }
    }
  
    // Inicialmente probamos cada número como punto de partida
    for (let i = 0; i < numbers.length; i++) {
      const remainingNumbers = numbers.slice(0, i).concat(numbers.slice(i + 1));
      backtrack(numbers[i], remainingNumbers, []);
    }
  
    return {
      result: closestResult,
      operations: bestOperations
    };
}
  
function processNumber(){
  const numbers = document.getElementById('numbersInput').value;
  const target = document.getElementById('targetInput').value;
  const closetResult = findClosestResult(numbers.split(' ').map(Number), target);
  if (closetResult.result == null){
    M.toast({html: 'No se ha encontrado ningun número'})
  }else{
    let result;
    result = `<ul class="collection">`;
    result += ` <li class="collection-item active">${closetResult.result}</li>`
    for (var i = 1; i < closetResult.operations.length; i++) {
      result += ` <li class="collection-item">${closetResult.operations[i]}</li>`
    }
    result += `</ul>`;
    const resultDiv = document.getElementById('closestResult');
    resultDiv.innerHTML = result;
  }
}