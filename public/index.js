const PRODUCTS_TEMPLATE = `{{#each products}}
<tr> <th scope="row">{{this.id}}</th> <td>{{this.title}}</td> <td>{{this.price}}</td>
<td><img src="{{this.thumbnail}}" alt="Imagen del producto"
class="rounded-sm" style="width: 50px;" /></td> </tr>
{{/each}}`;

const socket = io.connect();

document.getElementById("btnSave").addEventListener("click", function (event) {
  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };

  fetch("/api/productos/guardar", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(product),
  })
    .then((respuesta) => respuesta.json())
    .then((products) => {
      form.reset();
      const template = Handlebars.compile(PRODUCTS_TEMPLATE);
      document.getElementById("tbody").innerHTML = template(products);
    })
    .catch((error) => console.error(error));
});

socket.on("products", (products) => {
  const template = Handlebars.compile(PRODUCTS_TEMPLATE);
  document.getElementById("tbody").innerHTML = template(products);
  console.log(document.getElementById("tbody").innerHTML);
});
