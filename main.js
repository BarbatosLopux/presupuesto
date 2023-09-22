const myform = document.querySelector("form");
const myTable = document.querySelector("#myData");
const btnBucar = document.querySelector("#btnBuscar")


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
                <button class="btn-editar" data-id="${res[i].id}">Editar<b/button>
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

myTable.addEventListener("submit", async(e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const { valor } = data;
    data.valor = (typeof valor === "string") ? Number(valor) : null;

    let config = {
        metod
    }
})

function editarRegistro(id, nuevoValor, nuevoTipo) {
    const data = {
        valor: nuevoValor,
        caja: nuevoTipo
    };

    fetch(`https://6509d0e4f6553137159c123e.mockapi.io/tabla/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if (response.ok) {
            console.log("Registro actualizado con éxito.");
            mostrarDatos(); 
        } else {
            console.error("Error al actualizar el registro en el servidor.");
        }
    })
    .catch((error) => {
        console.error("Error al comunicarse con el servidor:", error);
    });
}
myTable.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-editar")) {
        const idAEditar = event.target.getAttribute("data-id");
        const nuevoValor = prompt("Nuevo valor:", ""); 
        const nuevoTipo = prompt("Nuevo tipo (ingreso/egreso):", ""); 
        if (nuevoValor !== null && nuevoTipo !== null) {
            editarRegistro(idAEditar, nuevoValor, nuevoTipo);
        }
    }
});
btnBuscar.addEventListener("click", function () {
    const filtro = inputBusqueda.value.toLowerCase();
    filas.forEach((fila, index) => {
        if (index === 0) return;
        const textoFila = fila.innerText.toLowerCase();
        fila.style.display = textoFila.includes(filtro) ? "table-row" : "none";
    });
});