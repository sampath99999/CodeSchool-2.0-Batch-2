document.addEventListener('DOMContentLoaded', function() {
    const addProductButton = document.getElementById('addProductButton');
    const productCategorySelect = document.getElementById('ProductCategory');

    // Fetch categories to populate the dropdown
    fetch('../api/get_category.php') // Implement get_categories.php to retrieve category data
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Populate the category dropdown with retrieved data
                data.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.category_name;
                    productCategorySelect.appendChild(option);
                });
            } else {
                console.error('Failed to fetch categories.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    addProductButton.addEventListener('click', function() {
        // Get values from input fields
        const productName = document.getElementById('ProductName').value.trim();
        const productPrice = parseFloat(document.getElementById('ProductPrice').value.trim());
        const productImage = document.getElementById('ProductImage').value.trim();
        const productDescription = document.getElementById('ProductDescription').value.trim();
        const categoryId = parseInt(productCategorySelect.value);

        // Validate input
        if (productName === '' || isNaN(productPrice) || productImage === '' || productDescription === '' || isNaN(categoryId)) {
            alert('Please fill in all fields and select a category.');
            return;
        }

        // Create an object to send to the server
        const productData = {
            name: productName,
            price: productPrice,
            image: productImage,
            description: productDescription,
            categoryId: categoryId
        };

        // Send product data to the server (PHP)
        fetch('../api/add_product.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Product added successfully.');
                // Clear input fields
                document.getElementById('ProductName').value = '';
                document.getElementById('ProductPrice').value = '';
                document.getElementById('ProductImage').value = '';
                document.getElementById('ProductDescription').value = '';
                productCategorySelect.value = '';
            } else {
                alert('Failed to add the product.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
