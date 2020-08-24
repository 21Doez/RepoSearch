//Prevent page reload
  form.addEventListener('keypress', e => {
    if(e.keyCode == 13) {
      e.preventDefault(); 
    }
  });
   form.addEventListener('submit', e => {
      e.preventDefault(); 
  });
window.onload = ()=>{
  //Elements
  let contenedor = document.getElementById("busqueda")
  let form = document.getElementById("form");
  let user = document.getElementById("user");
  let dataSend = document.getElementById("send");
  let owner = document.getElementById("owner");
  let results = document.getElementById("elements");
  //Get API data
  async function getRepos(){
    let userValue = user.value;
    let data = await fetch("https://api.github.com/users/" + userValue + "/repos");
    if(data.status == "404"){
      return "404";
    }else{
      return await data.json();
    }
  }
  //Show API results
  async function listData(repos){
    if(repos == "404"){
        owner.innerHTML = "Usuario no encontrado";
        results.innerHTML = "";
    }else{
      busqueda.className += " shadow";
      owner.innerHTML = "Repositorios de "+repos[0].owner.login;
      for(obj in repos){
      results.innerHTML += `<li class="element">
                            <h3 class="title"><strong>Nombre:</strong> ${repos[obj].name}</h3>
                            <p  class="fecha"><strong>Creacion:</strong> ${repos[obj].created_at.substring(0, 10)}</p>
                            <p class="description"><strong>Descripcion:</strong> ${repos[obj].description}</p>
                            <a class="go" href="${repos[obj].html_url}" target="_blank">Ir al repositorio</a>
                          </li>`;
      }
    }
  }
  //Search User
  dataSend.addEventListener("click", async ()=>{
    owner.innerHTML = "Repositorios de...";
    results.innerHTML = "";
      let repos = await getRepos();
      listData(repos);
  });

}