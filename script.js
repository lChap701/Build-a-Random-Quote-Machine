let quotes = [];

/* Uses Bootstrap color classes */
let colors = [
  {bg: "bg-dark", text: "text-secondary"},
  {bg: "bg-secondary", text: "text-dark"},
  {bg: "bg-primary", text: "text-info"},
  {bg: "bg-info", text: "text-primary"},
  {bg: "bg-success", text: "text-info"},
  {bg: "bg-warning", text: "text-primary"},
  {bg: "bg-white", text: "text-dark"},
  {bg: "bg-light", text: "text-secondary"}
];
let ctr = 0;

$(document).ready(function () {
  getQuotes();
  $('#new-quote').on('click', function() { 
    getQuotes();
  });
});

// Gets quotes from an API
function getQuotes() {
    /* 
   * Source: https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373 
  */

  // Allows quotes to be retrieved
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://type.fit/api/quotes",
    method: "GET"
  };

  // Gets quotes
  $.ajax(settings).done(function (response) {
    quotes = JSON.parse(response)
                   .filter(r => Boolean(r.author));
    displayQuotes();
  });
}

// Retrieves quotes
function displayQuotes() {
  const RANGE = quotes.length + 1;
  let i = Math.floor(Math.random() * RANGE);
  $("#text").text(quotes[i].text);
  $("#author").text(quotes[i].author);
  updateLinks(quotes[i].text, quotes[i].author);
  setColor();
}

function updateLinks(quote, author) {
  $('#tweet-quote').removeAttr("href");
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + quote + '" ' + author)
  );
}

// Adds new colors
function setColor() {
  // Resets counter
  if (ctr == colors.length) {
    ctr = 0;
  }

  // Toggles classes 
  const CLASS = colors[ctr].bg + " " + colors[ctr].text;
  $("body").toggleClass($("body").attr("class"));
  $("body").toggleClass(CLASS);
  ctr++;
}