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
    $('#submitButton').attr("id", "newEditButton")

     // Asignar evento para editar ya modificado todo
     $('#newEditButton').off('click').on('click', function(event) {
        secondPartEdit(event, index); 
    });

    
 }

 function secondPartEdit (event, index) {
    onClickAdd(event, true, index);
    $('#newEditButton').text("Agregar Producto");
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

export {render, createRow, onClickAdd, onClickEdit, secondPartEdit, resetTable, onClickDelete, assignEditDeleteEvents, clearInputs}