const myform = document.querySelector("form");
const myTable = document.querySelector("#myData");

async function mostrarDatos() {
    let res = await (await fetch("https://6509d0e4f6553137159c123e.mockapi.io/tabla")).json();
    console.log(res);

    myTable.innerHTML = ""; 

    for (let i = 0; i < res.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${res[i].id}</td>
            <td>${res[i].valor}</td>
            <td>${res[i].caja}</td>
            <td>
                <button class="btn-eliminar" data-id="${res[i].id}">Eliminar</button>
            </td>
        `;

        myTable.appendChild(row);
    }
}

addEventListener("DOMContentLoaded", mostrarDatos);

myTable.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-eliminar")) {
        const idAEliminar = event.target.getAttribute("data-id");

        fetch(`https://6509d0e4f6553137159c123e.mockapi.io/tabla/${idAEliminar}`, {
            method: "DELETE"
        })
        .then((response) => {
            if (response.ok) {
                mostrarDatos();
            } else {
                console.error("Error al eliminar el registro en el servidor.");
            }
        })
        .catch((error) => {
            console.error("Error al comunicarse con el servidor:", error);
        });
    }
});

myform.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const { valor } = data;
    data.valor = (typeof valor === "string") ? Number(valor) : null;

    let config = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
    };

    let res = await (await fetch("https://6509d0e4f6553137159c123e.mockapi.io/tabla", config)).json();
    console.log(res);
    window.location.reload();
});



/* myform.addEventListener("submit", async (e) => {
    ) */

/* futuras acciones: 
   - Buscar informacion dentro de la tabla 
   - Modificar información de la tabla
*/
