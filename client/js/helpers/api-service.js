const fetchList = async () => {
  const response = await fetch('http://localhost:1337/products'); 
  const product = await response.json();

  return product;
}

const createList = async ({ productName, price, qty }) => {
  const response = await fetch('http://localhost:1337/products', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productName, 
      price, 
      qty
    })
  });

  const reponseData = await response.json();

  return reponseData;
};

const deleteList = async (id) => {
  await fetch(`http://localhost:1337/products/${id}`, { method: 'DELETE' });
};

const updateList = async ({ id, ...props }) => {
  const response = await fetch(
    `http://localhost:1337/products/${id}`,
    {
      method: 'PATCH',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
    }
    );

  const reponseData = await response.json();

  return reponseData;
}

const ApiService = {
  fetchList,
  createList,
  deleteList,
  updateList
}

export default ApiService;
