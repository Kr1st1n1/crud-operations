import FormComponent from "./components/form-component.js";
import ApiService from "./helpers/api-service.js";
import productValidator from "./helpers/validators/product-validator.js";

const tableList = document.querySelector(".js-tbody-table");
const updateFormModal = new bootstrap.Modal("#update-form-modal");
const updateProductNameField = document.querySelector('#update-productName');
const updatePriceField = document.querySelector('#update-price');
const updateQtyField = document.querySelector('#edit-qty');
const btnUpdateProduct = document.querySelector('#btn-update');
let editableProductId = null;
let editibleProductName = null;
let editibleProductPrice = null;
let editibleProductQty = null;

const updateList = async () => {
  const {productName, price, qty} = await ApiService.updateList({
    id: editableProductId,
    productName: updateProductNameField.value,
    price: updatePriceField.value,
    qty: updateQtyField.value,
  });

  editibleProductName.innerText = productName;
  editibleProductPrice.innerText = price;
  editibleProductQty.innerText = qty;
}

  const addTableItem = ({ 
    productName,
    price,
    qty,
    id,
    }) => {
    const listItem = document.createElement('tbody')
    
    const elementName = document.createElement('td');
    elementName.className = "list-item_value";
    elementName.innerText = productName;

    const elementPrice = document.createElement('td');
    elementPrice.className = "list-item_value";
    elementPrice.innerText = price;

    const elementQty = document.createElement('td');
    elementQty.className = "list-item_value";
    elementQty.innerText = qty;

    const btnDelete = document.createElement('button');
    btnDelete.className = 'button-delete';
    btnDelete.innerText = '✖';
    btnDelete.addEventListener('click', async () => {
      await ApiService.deleteList(id);
      listItem.remove();
    });

    const btnUpdate = document.createElement('button'); 
    btnUpdate.className = 'button-update'; 
    btnUpdate.innerText = '↻'; 
    btnUpdate.addEventListener('click', () => {
      updateProductNameField.value = elementName.innerText;
      updatePriceField.value = elementPrice.innerText;
      updateQtyField.value = elementQty.innerText;
      editableProductId = id;
      editibleProductName = elementName;
      editibleProductPrice = elementPrice;
      editibleProductQty = elementQty;
      
     updateFormModal.show();
    });

    listItem.append(
      elementName,
      elementPrice,
      elementQty,
      btnDelete,
      btnUpdate
    );
  
    tableList.insertAdjacentElement('afterbegin', listItem);
  }

  const formProduct = new FormComponent(
    '.js-product-form',
    productValidator,
    async ({productName, price, qty}) => {
      const result = await ApiService.createList({productName, price, qty});
      addTableItem(result);
    },
  );

  const todos = await ApiService.fetchList();
  todos.forEach(addTableItem);

  btnUpdateProduct.addEventListener('click', () => {
    updateList();
    updateFormModal.hide();
  });
