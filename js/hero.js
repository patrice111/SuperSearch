var hero;
var heroId;
function getHeroData() {
  heroId = location.search.split('=')[1];
  fetch(
    `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${heroId}.json`
  )
    .then((res) => res.json())
    .then((heroDetailsResponse) => {
      console.log('heroDetailsResponse: ', heroDetailsResponse);
      hero = heroDetailsResponse;
      fillHeroData(hero);
    });
}

getHeroData();

//function to fill all the super hero data//

function fillHeroData(data) {
  var img = document.getElementById('hero-image');
  img.setAttribute('src', data.images.lg);
  document.getElementById('hero-name').innerText = data.name;
  var powers = data.powerstats;
  AddPowers(powers);
  var otherNames = data.biography.aliases;
  aliases(otherNames);
  biography(data.biography);
  var connections = data.connections['group-affiliation'];
  document.getElementById('connections').innerText =
    'Connections : ' + connections;
  var publisher = document.createElement('span');
  publisher.innerText = data.biography.publisher;
  // publisher.classList.add('details')
  publisher.style.fontFamily = 'sans-serif';
  publisher.style.fontSize = '1.3rem';
  document.getElementById('additional-info').appendChild(publisher);
}
//function to show biography
function biography(bio) {
  console.log(bio);
  for (const [key, value] of Object.entries(bio)) {
    var p = document.createElement('p');
    p.innerText = `${key}: ${value}`;
    p.style.textTransform = 'capitalize';
    document.getElementById('occupation').appendChild(p);
  }
}
//function to show other names of a hero

function aliases(otherNames) {
  for (let i = 0; i < otherNames.length; i++) {
    var span = document.createElement('span');
    if (otherNames.length == 1) {
      span.innerText = ' ( ' + otherNames[i] + ' )';
      span.style.textTransform = 'Capitalize';
      document.getElementById('aliases').appendChild(span);
      break;
    }
    if (i == 0) {
      span.innerText = ' ( ' + otherNames[i] + ' , ';
    } else if (i == otherNames.length - 1) {
      span.innerText = otherNames[i] + ' ) ';
    } else {
      span.innerText = otherNames[i] + ' , ';
    }
    span.style.textTransform = 'Capitalize';

    document.getElementById('aliases').appendChild(span);
  }
}

// Adding stats of the hero
function AddPowers(powers) {
  // Traversing through powers

  for (const [key, value] of Object.entries(powers)) {
    var p = document.createElement('p');
    p.innerText = `${key}: ${value}`;
    p.classList.add('details');
    document.getElementById('hero-details').appendChild(p);
    // console.log(`${key}: ${value}`);
  }
}

