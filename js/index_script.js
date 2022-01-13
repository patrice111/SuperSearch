// Trigger function get Data on each keyup event in input
const heroHTML=document.getElementById('hero-name');
heroHTML.onkeyup=getData;
const search=document.getElementById('btn-search');
const favourite=document.getElementById('btn-favourite');

//hero id
let heroId=0;
// function to get data
function getData(e){

    var hero = e.target.value;
    var list = document.getElementById('auto-complete');
    clearList();
  
    var xhrRequest = new XMLHttpRequest();
    // Handling http request
    xhrRequest.onload = function (){
        var result=JSON.parse(xhrRequest.response);
        // Getting all the available data
        var names =result.results;

        if(names==null){
            clearList();
            console.log('not found!')
        }else{
            for(var i of names){
                // creating individual list item and appending it
                var li = document.createElement('li');
                li.innerText=i.name;
                li.id=i.id;
                li.classList.add('list-group-item');
                li.addEventListener('click',function(){
                    heroId=this.id;
                    document.getElementById('hero-name').value=this.innerText;
                    clearList();
                    // brings the focus to input
                    document.getElementById('hero-name').focus();
                    return;
                })
                var ul = document.getElementById('auto-complete').appendChild(li);
            }
        }
        
    }
    // xmlRequest    
    xhrRequest.open('GET','https://akabab.github.io/superhero-api/api/all.json');
    xhrRequest.send();
}
// handling enter key event

hero.addEventListener('keydown',function(event){

    if(event.key.code==13){

        if(heroId==0){
            alert('No hero found! Try selecting the hero from the list');
        }else{
        showHero();
        }
    }
});

// Function to clear the list items from list
function clearList(){

    var list = document.getElementById('auto-complete');
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild)
    }
    // heroId=null;
}
// on clicking search button
search.addEventListener('click',showHero);
function showHero(){
    var name = document.getElementById('hero-name').value;
    if(name==""){
        alert("Enter the name to be searched");
    }else if(heroId==0){
        alert('No hero found! Try selecting the hero from the list');
    }else{

            window.open('superhero.html?id='+heroId,'blank');
        
    }
    // console.log(hero);
}
// on clicking my favourite button
favourite.addEventListener('click',function(){
    window.location.assign('favourite.html');
})
