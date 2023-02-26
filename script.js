let apiQuotes = [];
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const copyBtn = document.querySelector('#copy');
const nextQuoteBtn = document.querySelector('.new-quote');
const copiedDiv = document.querySelector('.copied')

nextQuoteBtn.addEventListener('click', () => newQoute());
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(`"${quoteText.innerText}" - ${quoteAuthor.innerText}`)    

    showMessage()
})

// Show "Copied" message
function showMessage() {
    copiedDiv.classList.add('hide-animation');
    setTimeout(() => {copiedDiv.classList.remove('hide-animation')}, 1000);
}

// Show new quote
function newQoute() {
    // pick a random qoute
    const qoute = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
     if (qoute.text.length > 120 ||  qoute.text.length < 100 ) {
        newQoute()
     } else {
        console.log(qoute.text.length)
        quoteText.innerText = qoute.text;
        quoteAuthor.innerText = qoute.author;
    }
    
}

// Get qoutes from API
async function getQuotes () {
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQoute()
    } catch (error) {
        console.log(error)
    }
};

getQuotes();


