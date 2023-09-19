let myfrom = document.querySelector("form");
let myTbla = document.querySelector("#mydata");
addEventListener("DOMContentLoaded", async()=>{
    let res = await (await fetch("https://6509d043f6553137159c1059.mockapi.io/tabla")).json();
    for (let i = 0; i < res.length; i++) {
        myTbla.insertAdjacentHTML ("beforeend", ` 
        <tr> 
            <td>${res[i].id}</td>
            <td>${res[i].valor}</td>
            <td>${res[i].caja}</td>        
        </tr>
        `);
    }
})
myfrom.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    let config = {
        method : "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(data)
    };
    let res = await (await fetch("https://6509d043f6553137159c1059.mockapi.io/tabla"))

})


/* myfrom.addEventListener("submit", (e) => {
    console.log(e);
    e.preventDefault();
})
 */

myfrom.addEventListener("submit", (e) => {
    const data = Object.fromEntries(new FormData(e.target));
    const{caja, ...datanueva} = data
    console.log(datanueva);
    e.preventDefault();

})

const obtener=() => {
    let api = fetch ('https://6509d043f6553137159c1059.mockapi.io/tabla')
    console.log(api);
}
obtener() 

