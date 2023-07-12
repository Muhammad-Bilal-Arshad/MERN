import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';

const router = express.Router();

// Import the ShoppingCartItem model
import { shop } from '../Models/shopping.model.js';

// Enable session middleware
router.use(
  session({
    secret: 'Bilal-Arshad',
    resave: false,
    saveUninitialized: true,
  })
);

router.post('/addItem', async (req, res) => {
  try {
    // Get the item details from the request body
    const { itemNumber, title, price, color } = req.body;

    // Create a new item using the model
    const newItem = new shop({
      itemNumber,
      title,
      price,
      color,
    });

    // Save the item to the database
    const savedItem = await newItem.save();

    // Send a response with the saved item
    res.json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/setItemdetails', async (req, res) => {
  try {
    // Get the item number and quantity from the request body
    const { itemNumber, quantity,quantityInHand } = req.body;

    // Find the item in the database
    const item = await shop.findOne({ itemNumber });
   

    // Check if the item exists and if its status is "promotion"
    if (item && item.status === 'promotion') {
      // Calculate the discounted price if quantity in hand is greater than requested quantity
      if (item.quantityInHand > quantity) {
        item.price = item.price * 0.8; // Apply a 20% discount
      }
    }

    // Access the session using req.session
    const sessionData = req.session;

    // Create an array to store the items in the session if it doesn't exist
    if (!sessionData.items) {
      sessionData.items = [];
    }
    if(quantityInHand>quantity && status=='promotion')
    {
        price = price * 0.8;

    }

    // Store the item details in the session
    const itemData = {
      itemNumber: item.itemNumber,
      title: item.title,
      description: item.description,
      color: item.color,
      quantity,
      price: item.price,
      quantityInHand,
      status: item.status
    };

    // Add the item to the session items array
    sessionData.items.push(itemData);

    // Send the response
    res.json(sessionData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
