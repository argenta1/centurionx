document.addEventListener('DOMContentLoaded', function () {
    const followerSlider = document.getElementById('follower-range');
    const followerAmountDisplay = document.getElementById('follower-amount');
    const totalCostDisplay = document.getElementById('total-cost');
    const orderNumberDisplay = document.getElementById('order-number');
    const progressCircle = document.getElementById('progress-circle');

    const pricePerThousand = 3; // Price per thousand followers

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
            createOrder(link, quantity);
        }
    });

    function createOrder(link, quantity) {
        const proxyUrl = '/create-order'; // Endpoint of your proxy server

        fetch(`${proxyUrl}?link=${encodeURIComponent(link)}&quantity=${quantity}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.order) {
                orderNumberDisplay.textContent = `Order Number: ${data.order}`;
                progressCircle.textContent = 'Order Status: Pending...'; // Placeholder
            } else {
                throw new Error('Order creation failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while creating the order. Please check the console for details.');
        });
    }

    updateCost(); // Initial cost update
});
