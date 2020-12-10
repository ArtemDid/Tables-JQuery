const orderTableTbody = $('tbody #id_orderTable');//что бы вставить строку в tbody

var isEditMode = false;

function createInputText(newItemValue) {    
    let newIput = document.createElement("input");
    newIput.type = "text";
    newIput.value=`${newItemValue}`;
    newIput.name=`${newItemValue}`;
    return newIput;
}

function edit(editRow, values) {

    let categoryIput = createInputText(values.category);
    editRow.children()[0].innerText = "";
    editRow.children()[0].append(categoryIput);


    let typeInput = createInputText(values.type);
    editRow.children()[1].innerText = "";
    editRow.children()[1].append(typeInput);

    let manufInput = createInputText(values.manuf);
    editRow.children()[2].innerText = "";
    editRow.children()[2].append(manufInput);

    let modelInput = createInputText(values.model);
    editRow.children()[3].innerText = "";
    editRow.children()[3].append(modelInput);


    let qtyInput = createInputText(values.qty);
    qtyInput.type = "number";
    qtyInput.min="1";
    editRow.children()[4].innerText = "";
    editRow.children()[4].append(qtyInput);
    }

function save(editRow){ 
   
    editRow.children()[0].innerHTML = editRow.find("td>input").val();    
    editRow.children()[1].innerHTML = editRow.find("td>input").val();
    editRow.children()[2].innerHTML = editRow.find("td>input").val();
    editRow.children()[3].innerHTML = editRow.find("td>input").val();
    editRow.children()[4].innerHTML = editRow.find("td>input").val();
    console.dir(editRow);
}

function editItem(button) {
    var editRow = $(button).parent().parent(); 
    let values ={};
    values.category=editRow.children()[0].innerText;  
    values.type=editRow.children()[1].innerText;
    values.manuf=editRow.children()[2].innerText;
    values.model=editRow.children()[3].innerText;
    values.qty=editRow.children()[4].innerText;    

    edit(editRow, values);

    if (!isEditMode) {
        $(button).parent().append( "<input type='button' name='btnSaveItem' onclick='saveItem(this)' value='Save'/>");        
        isEditMode = true;
    }
}
function saveItem(button) {
    
    var editRow = $(button).parent().parent(); 
    save(editRow);
    if (isEditMode) isEditMode = false;  
   $("[name=btnSaveItem]").remove(); 
}

function addItemToOrder() {    

    $("#id_orderTable").children('tbody').append(
        `<tr><td>${$("[name='newItemCategory']").val()}</td><td>${ $("[name='newItemType']").val()}</td><td>${$("[name='newItemManuf']").val()}
        </td><td>${$("[name='newItemModel']").val()}</td><td>${$("[name='newItemQty']").val()}</td><td>       
       <input type='button' name='btnDeleteItem' onclick='deleteItem(this)' value='Delete'/>
       <input type='button' name='btnEditItem' onclick='editItem(this)' value='Edit'/>            
        </td></tr>`
    );  
    $("[name='newItemCategory']").val("");
    $("[name='newItemType']").val("");
    $("[name='newItemManuf']").val("");
    $("[name='newItemModel']").val("");
    $("[name='newItemQty']").val("1");   
};

function deleteItem(button) {
    if (isEditMode) isEditMode = false;
    {   
    const rowParent = $(button).parent().parent().parent();    
    $(button).parent().parent().remove();
    }    
}
$("[name='addItemToOrder']").click(addItemToOrder);
