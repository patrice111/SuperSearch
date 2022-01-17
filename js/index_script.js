// Trigger function get Data on each keyup event in input
const heroHTML = document.getElementById('hero-name');
heroHTML.onkeyup = searchLocalStorage;

/* this notation executes the function right away */
function getInitialData() {
  fetch('https://akabab.github.io/superhero-api/api/all.json')
    .then((res) => res.json())
    .then((heroesResponse) => {
      /* we access data as localStorage.getItem =) */
      localStorage.setItem('heroes',JSON.stringify(heroesResponse))
    })
  .catch(e=>console.log(e))
}

const data = getInitialData();
/* you may want to set up some default superhero when data loads */

const all = JSON.parse(localStorage.getItem('heroes'));

let heroId = 0

function searchLocalStorage() {
  /* get what the user has typed */
  const currentValue = heroHTML.value 
  
  clearList();

  if (!all) {console.log('error');return}

  const subsetByName = all.filter((hero) =>
    hero.name.toLowerCase().includes(currentValue.toLowerCase())
  );

  if (subsetByName == []) { console.log('not found!'); } 

  else {
    for (const i of subsetByName) {
      // creating individual list item and appending it
      let li = document.createElement('li');
      li.innerText = i.name;
      li.id = i.id;
      li.classList.add('list-group-item');
      li.addEventListener('click', function () {
        heroHTML.innerHTML = this.innerText;
        clearList();
        // brings the focus to input
        heroHTML.focus();
        /* store the ID in sessionStorage and 
         * read localStorage (which is shared) */
        const urlToOpen = window.location.href.split('index.html')[0] + 'superhero.html'
        const newTab= window.open(urlToOpen, '_blank');
        newTab.sessionStorage.setItem('id',id);
        recentlyOpenedWindow.sessionStorage.setItem('heroId', heroId);
        return;
      });
      document.getElementById('auto-complete').appendChild(li);
    }
  }
}

// Function to clear the list items from list
function clearList() {
  const list = document.getElementById('auto-complete');
  if (list.hasChildNodes()) {
   list.innerHTML = "";
  }
}

