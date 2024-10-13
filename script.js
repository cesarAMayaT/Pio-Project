import ejemploProductos from "./ejemploProductos.js";
var listaProductos = [];

function render (addProducto){    
    const cuerpoTabla = $('tbody');
    cuerpoTabla.append(addProducto);
 }
 
 function createRow(producto, index = listaProductos.length){
    let row =     
        `<tr id = "${producto.shortName}">
            <td>${producto.title}</td>
            <td>${producto.description}</td>
            <td>${producto.tags.split(",").map(tag => ` #${tag.trim()}`)}</td>
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

function onClickAdd (event, edit = false, index = 0){
        console.log("onClickAdd triggered");

        event.preventDefault(); 

        let producto = {};    
        
        producto.shortName = $('#shortName').val();
        producto.title = $('#title').val();
        producto.description = $('#description').val();
        producto.tags = $('#tags').val();
        producto.category = $('#category').val();
        producto.releaseDate = $('#releaseDate').val();
        producto.price = $('#price').val();
        producto.fileFormat = $('#fileFormat').val();
        producto.fileSize = $('#fileSize').val();
        producto.downloads = $('#downloads').val();

        if (edit) {
            listaProductos[index] = producto;
            resetTable();        
            clearInputs();
            return;
        }

        listaProductos.push(producto);
        resetTable();       
       
 }

 function onClickEdit (event){
    
    const index = event.target.dataset.index;
    const producto = listaProductos[index];
    
    $('#shortName').val(producto.shortName);
    $('#title').val(producto.title);
    $('#description').val(producto.description);
    $('#tags').val(producto.tags);
    $('#category').val(producto.category);
    $('#releaseDate').val(producto.releaseDate);
    $('#price').val(producto.price.slice(1));
    $('#license').val(producto.license);
    $('#fileFormat').val(producto.fileFormat);
    $('#fileSize').val(producto.fileSize);
    $('#downloads').val(producto.downloads);

    $('#submitButton').text("Editar")
    $('#H2').text("Editar Producto")
    $('#submitButton').attr("id", "newEditButton")

     // Asignar evento para editar ya modificado todo
     $('#newEditButton').off('click').on('click', function(event) {
        onClickAdd(event, true, index);
        secondPartEdit(event, index); 

    });

    $('html, body').animate({
        scrollTop: $(".add-product").offset().top // Desplazarse a la sección de agregar producto
    }, 800); // Duración de la animación
        
 }

 function secondPartEdit (event, index) {
    $('#newEditButton').text("Agregar Producto");
    $('#H2').text("Agregar Nuevo Producto");
    $('#newEditButton').attr("id", "submitButton");
    $('#submitButton').off('click').on('click', onClickAdd);

    console.log("hello");

 }
 
 function resetTable() {
    
    const cuerpoTabla = $('tbody');
    cuerpoTabla.empty(); 

    listaProductos.forEach((producto, index) => {
        render(createRow(producto, index));
    });

    assignEditDeleteEvents()
}

 function onClickDelete (event){
    resetTable()
    const index = event.target.dataset.index; 
    listaProductos.splice(index, 1); 
    resetTable(); 
    clearInputs();
 }

 function assignEditDeleteEvents() {
    // Asignar evento para editar
    $('.buttonEdit').off('click').on('click', onClickEdit);
    // Asignar evento para eliminar
    $('.buttonDelete').off('click').on('click', onClickDelete);
    
   
}
 
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
 

function floatingButton() {
    // Al hacer clic en el botón flotante
    $("#floatingButton").click(function() {
        const addProductSection = $(".add-product").offset().top;
        const scrollPosition = $(window).scrollTop();
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();

        // Verifica si el usuario está cerca del final de la página o en la sección de agregar producto
        if (scrollPosition + windowHeight >= documentHeight - 50 || scrollPosition >= addProductSection - 50) {
            $('html, body').animate({
                scrollTop: 0 // Desplazarse a la parte superior
            }, 800); // Duración de la animación
        } 
        // De lo contrario, desplazar a la sección de agregar producto
        else {
            $('html, body').animate({
                scrollTop: addProductSection // Desplazarse a la sección de agregar producto
            }, 800); // Duración de la animación
        }
    });

    // Cambiar el texto del botón dependiendo de la posición del scroll
    $(window).scroll(function() {
        const addProductSection = $(".add-product").offset().top;
        const scrollPosition = $(window).scrollTop();

        // Cambia el texto del botón a "Subir" cuando el usuario pasa la sección de agregar productos
        if (scrollPosition >= addProductSection - 200) {
            $("#floatingButton").text("Subir").removeClass("add-button").addClass("scroll-up");
        } else {
            $("#floatingButton").text("Agregar Artículo").removeClass("scroll-up").addClass("add-button");
        }
    });
    

    // Cambiar el texto y el estilo del botón dependiendo de la posición del scroll
    $(window).scroll(function() {
        const addProductSection = $(".add-product").offset().top;
        const scrollPosition = $(window).scrollTop();

        if (scrollPosition >= addProductSection - 50) { // Un poco antes de llegar a la sección
            $("#floatingButton").text("Subir").removeClass("add-button").addClass("scroll-up");
        } else {
            $("#floatingButton").text("Agregar Artículo").removeClass("scroll-up").addClass("add-button");
        }
    });
  
}
   
 function app() {
    $('#submitButton').off('click');

    if (ejemploProductos) {
        for (let i = 0; i < ejemploProductos.length; i++) {
            listaProductos.push(ejemploProductos[i]);
            render(createRow(ejemploProductos[i], i));
        }
    }
    
    const form = document.querySelector('form');
    $('#submitButton').off('click').on('click',onClickAdd).get(0);
    assignEditDeleteEvents();
    
    floatingButton();
};

app();