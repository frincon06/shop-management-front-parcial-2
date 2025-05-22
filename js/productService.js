function getProducts() {
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de productos</h4>';
    fetch("https://fakestoreapi.com/products", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
        .then((result) => {
            return result.json().then(
                data => ({
                    status: result.status,
                    body: data
                })
            )
        })
        .then((response) => {
            if (response.status === 200) {
                let listProducts = `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tittle</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">category</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                `;

                response.body.forEach(product => {
                    listProducts += `
                        <tr>
                            <td>${product.id}</td>
                            <td>${product.tittle}</td>
                            <td>${product.price}</td>
                            <td><figcaption class="blockquote-footer">${product.description}</figcaption></td>
                            <td>${product.category}</td>
                            <td><button type="button" class="btn btn-outline-info btn-sm" onclick="showProductInfo(${product.id})">Ver</button></td>
                        </tr>
                    `;
                });

                listProducts += `
                    </tbody>
                </table>
                
                `;

                document.getElementById('info').innerHTML = listProducts;
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontraron productos</h3>';
            }
        });
}

function showProductInfo(productId) {
    fetch('https://fakestoreapi.com/products/'+ productId, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
        .then((result) => {
            return result.json().then(
                data => ({
                    status: result.status,
                    body: data
                })
            )
        })
        .then((response) => {
            if (response.status === 200) {
                showModalProduct(response.body.data);
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontró el producto</h3>';
            }
        });
}

function showModalProduct(product) {
    const modalContent = `
    <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="modalProductLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalProductLabel">Producto</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${product.tittle}</h5>
                            <p class="card-text"><strong>ID:</strong> ${product.id}</p>
                            <p class="card-text"><strong>Precio:</strong> ${product.price}</p>
                            <p class="card-text"><strong>Precio:</strong> ${product.category}</p>
                            <p class="card-text"><strong>Descripcion:</strong> ${product.description}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById('showModal').innerHTML = modalContent;
    const modal = new bootstrap.Modal(document.getElementById('modalProduct'));
    modal.show();
}

