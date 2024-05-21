var validWords;

fetch('./0_palabras_todas_no_conjugaciones.txt')
    .then((response) => response.text())
    .then((text) => {
        let validWordsList = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        validWords = new Set(validWordsList);
    });

function findAllWords(validWords, possibleLetters) {
    const results = [];

    function backtrack(currentWord, remainingLetters) {
        if (currentWord.length > 4 && validWords.has(currentWord)) {
            results.push(currentWord);
        }

        for (let i = 0; i < remainingLetters.length; i++) {
            const newWord = currentWord + remainingLetters[i];
            const newRemainingLetters = remainingLetters.slice(0, i).concat(remainingLetters.slice(i + 1));
            backtrack(newWord, newRemainingLetters);
        }
    }

    backtrack('', possibleLetters);
    return results;
}

function sortAndFilterWords(words) {
    const uniqueWordsSet = new Set(words);
    const uniqueWordsArray = Array.from(uniqueWordsSet);
    return uniqueWordsArray
        .filter(word => word.length > 4)
        .sort((a, b) => b.length - a.length)
        .slice(0, 20); 
}

function processLetters(){
    const possibleLetters = document.getElementById('lettersInput').value;
    const allWords = findAllWords(validWords, possibleLetters.replace(/[^a-zA-Z]/g, '').trim().toLowerCase());
    const sortedWords = sortAndFilterWords(allWords);
    const resultDiv = document.getElementById('lettersResult');

    let result;
    if (sortedWords.length > 0){
        result = `<ul class="collection">`;
        for (var i = 0; i < sortedWords.length; i++) {
            result += ` <li class="collection-item">${sortedWords[i]}</li>`
        }
        result += `</ul>`;
        resultDiv.innerHTML = result;
    }else{
        M.toast({html: 'No se ha encontrado ninguna palabra'})
    }
};