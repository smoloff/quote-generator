let apiQuotes = [];
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const buttonsContainer = document.querySelector('.buttons-container')
const copyBtn = document.querySelector('#copy');
const nextQuoteBtn = document.querySelector('.new-quote');
const copiedDiv = document.querySelector('.copied')
const quoteContainer = document.querySelector('#quote-container')

nextQuoteBtn.addEventListener('click', () => newQoute());
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(`"${quoteText.innerText}" - ${quoteAuthor.innerText}`)    

    showMessage()
})

// Show "Copied" message
function showMessage() {
    copiedDiv.classList.add('hide-animation');
    setTimeout(() => {copiedDiv.classList.remove('hide-animation')}, 1500);
}

// Show new quote
function newQoute() {
    stopLoading()
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
    startLoading ()
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQoute()
    } catch (error) {
        console.log(error)
    }
};

function startLoading () {
    quoteContainer.classList.add('gradient');
    buttonsContainer.classList.add('hidden-on-loading');
    quoteAuthor.classList.add('hidden-on-loading');
    quoteText.classList.add('hidden-on-loading');
    

}

function stopLoading () {
    quoteContainer.classList.remove('gradient');
    buttonsContainer.classList.remove('hidden-on-loading');
    quoteAuthor.classList.remove('hidden-on-loading');
    quoteText.classList.remove('hidden-on-loading');

}

getQuotes();


