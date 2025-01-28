const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sample route to render the template
app.get('/listings', (req, res) => {
    const allListings = [
        { _id: '1', title: 'Listing 1', description: 'Description 1', image: '/path/to/image1.jpg', price: 1000 },
        { _id: '2', title: 'Listing 2', description: 'Description 2', image: '/path/to/image2.jpg', price: 2000 }
    ];
    res.render('listings/temp', { allListings });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
