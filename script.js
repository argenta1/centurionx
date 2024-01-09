document.addEventListener('DOMContentLoaded', function () {
    const serviceId = 3723; // Fixed service ID
    const pricePerThousand = 3; // Price per thousand followers
    const followerSlider = document.getElementById('follower-range');
    const followerAmountDisplay = document.getElementById('follower-amount');
    const totalCostDisplay = document.getElementById('total-cost');
    const orderNumberDisplay = document.getElementById('order-number');
    // Placeholder for progress circle element
    const progressCircle = document.getElementById('progress-circle');

    function updateCost() {
        let followers = parseInt(followerSlider.value, 10);
        let totalCost = (followers / 1000) * pricePerThousand;
        followerAmountDisplay.textContent = followers;
        totalCostDisplay.textContent = totalCost.toFixed(2);
    }

    followerSlider.addEventListener('input', updateCost);

    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault();

        let link = document.getElementById('link').value;
        let quantity = parseInt(followerSlider.value, 10);
        let totalPrice = (quantity / 1000) * pricePerThousand;

        if (confirm(`Confirm order of ${quantity} followers for $${totalPrice.toFixed(2)}?`)) {
            createOrder(serviceId, link, quantity);
        }
    });

    function createOrder(serviceId, link, quantity) {
        const apiUrl = 'https://cloutsy.com/api/v2';
        const apiKey = '495fe7945ae09755a85336db1ba91596';

        fetch(`${apiUrl}?action=add&service=${serviceId}&link=${link}&quantity=${quantity}&key=${apiKey}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.order) {
                console.log('Order Created:', data.order);
                orderNumberDisplay.textContent = data.order;
                // Placeholder for updating progress circle
                progressCircle.textContent = 'Order Status: Pending...'; // Update this as per actual status
                checkOrderStatus(data.order);
            } else {
                console.error('Order creation failed:', data);
                alert('Failed to create order. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while creating the order.');
        });
    }

    // Function to check order status (Placeholder functionality)
    function checkOrderStatus(orderId) {
        // TODO: Implement actual status checking logic
        console.log('Checking status for order:', orderId);
        // Update progress circle based on order status
        // This could be a polling mechanism or WebSocket connection, depending on API
    }

    // Initial cost update
    updateCost();
});
