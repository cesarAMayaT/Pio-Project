
import ejemploProductos from "./ejemploProductos.js"

var listaProductos = [];

// Renderizar la tabla
function render(addProducto) {
    const cuerpoTabla = $('tbody');
    cuerpoTabla.append(addProducto);
}

// Crear una fila de producto
function createRow(producto, index = listaProductos.length) {
    let row = `
        <tr id="${producto.shortName}">
            <td>${producto.title}</td>
            <td>${producto.description}</td>
            <td>${producto.tags.split(",").map(tag => ` #${tag.trim()}`).join(' ')}</td>
            <td>${producto.category}</td>
            <td>${producto.releaseDate}</td>
            <td>${producto.price}</td>
            <td>${producto.fileFormat}</td>
            <td>${producto.fileSize}</td>
            <td>${producto.downloads}</td>
            <td>
                <button class="buttonEdit" data-index="${index}">Editar</button>
                <button class="buttonDelete" data-index="${index}">Eliminar</button>
            </td>
        </tr>`;
    return row;
}

// Añadir o editar un producto
function onClickAdd(event, edit = false, index = 0) {
    event.preventDefault();

    event.preventDefault();

    // Validar que todos los inputs estén llenos
    if (!validateInputs()) {
        alert("Por favor, complete todos los campos antes de continuar."); // Mensaje de alerta
        return false; 
    }

    let producto = {
        shortName: $('#shortName').val(),
        title: $('#title').val(),
        description: $('#description').val(),
        tags: $('#tags').val(),
        category: $('#category').val(),
        releaseDate: $('#releaseDate').val(),
        price: $('#price').val(),
        fileFormat: $('#fileFormat').val(),
        fileSize: $('#fileSize').val(),
        downloads: $('#downloads').val()
    };

    if (edit) {
        listaProductos[index] = producto;
        resetTable();
        clearInputs();
        return true;
    }

    listaProductos.push(producto);
    resetTable();
    clearInputs();
}

// Editar un producto existente
function onClickEdit(event) {
    const index = event.target.dataset.index;
    const producto = listaProductos[index];

    $('#shortName').val(producto.shortName);
    $('#title').val(producto.title);
    $('#description').val(producto.description);
    $('#tags').val(producto.tags);
    $('#category').val(producto.category);
    $('#releaseDate').val(producto.releaseDate);
    $('#price').val(producto.price.slice(1)); 
    $('#fileFormat').val(producto.fileFormat);
    $('#fileSize').val(producto.fileSize);
    $('#downloads').val(producto.downloads);

    $('#submitButton').text("Editar");
    $('#H2').text("Editar Producto");
    $('#submitButton').attr("id", "newEditButton");

    // Asignar evento para editar
    $('#newEditButton').off('click').on('click', function (event) {
        if (onClickAdd(event, true, index)) resetForm();
    });

    // Desplazar a la sección de agregar producto
    $('html, body').animate({
        scrollTop: $(".add-product").offset().top
    }, 800);
}

// Restaurar el formulario al estado inicial
function resetForm() {
    $('#newEditButton').text("Agregar Producto");
    $('#H2').text("Agregar Nuevo Producto");
    $('#newEditButton').attr("id", "submitButton");
    $('#submitButton').off('click').on('click', onClickAdd);
}

// Eliminar un producto
function onClickDelete(event) {
    const index = event.target.dataset.index;
    listaProductos.splice(index, 1);
    resetTable();
    clearInputs();
}

// Reiniciar la tabla después de cada cambio
function resetTable() {
    const cuerpoTabla = $('tbody');
    cuerpoTabla.empty();

    listaProductos.forEach((producto, index) => {
        render(createRow(producto, index));
    });

    assignEditDeleteEvents();
}

// Asignar eventos de edición y eliminación a los botones correspondientes
function assignEditDeleteEvents() {
    $('.buttonEdit').off('click').on('click', onClickEdit);
    $('.buttonDelete').off('click').on('click', onClickDelete);
}

// Limpiar los campos del formulario
function clearInputs() {
    $('#shortName').val('');
    $('#title').val('');
    $('#description').val('');
    $('#tags').val('');
    $('#category').val('');
    $('#releaseDate').val('');
    $('#price').val('');
    $('#fileFormat').val('');
    $('#fileSize').val('');
    $('#downloads').val('');
}

//Verifica si todos los inputs han sido llenados
function validateInputs() {
    const inputs = [
        $('#shortName').val(),
        $('#title').val(),
        $('#description').val(),
        $('#tags').val(),
        $('#category').val(),
        $('#releaseDate').val(),
        $('#price').val(),
        $('#fileFormat').val(),
        $('#fileSize').val(),
        $('#downloads').val()
    ];

    for (let input of inputs) {
        if (!input.trim()) { 
            return false; 
        }
    }
    return true; 
}

// Botón flotante para desplazarse
function floatingButton() {
    $("#floatingButton").click(function () {
        const addProductSection = $(".add-product").offset().top;
        const scrollPosition = $(window).scrollTop();
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();

        if (scrollPosition + windowHeight >= documentHeight - 50 || scrollPosition >= addProductSection - 50) {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        } else {
            $('html, body').animate({
                scrollTop: addProductSection
            }, 800);
        }
    });

    $(window).scroll(function () {
        const addProductSection = $(".add-product").offset().top;
        const scrollPosition = $(window).scrollTop();

        if (scrollPosition >= addProductSection - 200) {
            $("#floatingButton").text("Subir").removeClass("add-button").addClass("scroll-up");
        } else {
            $("#floatingButton").text("Agregar Artículo").removeClass("scroll-up").addClass("add-button");
        }
    });
}

// Inicializar la aplicación
function app() {
    if (ejemploProductos) {
        ejemploProductos.forEach((producto, index) => {
            listaProductos.push(producto);
            render(createRow(producto, index));
        });
    }

    $('#submitButton').off('click').on('click', onClickAdd);
    assignEditDeleteEvents();
    floatingButton();
}

app();
