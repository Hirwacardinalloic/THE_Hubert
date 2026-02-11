const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Get all cars (public)
router.get('/', async (req, res) => {
  try {
    const { type, status, limit, minPrice, maxPrice } = req.query;
    let query = 'SELECT * FROM cars WHERE 1=1';
    const params = [];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (minPrice) {
      query += ' AND price_per_day >= ?';
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      query += ' AND price_per_day <= ?';
      params.push(parseFloat(maxPrice));
    }

    query += ' ORDER BY created_at DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const cars = await db.allAsync(query, params);

    res.json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    console.error('Get cars error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cars'
    });
  }
});

// Get single car by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const car = await db.getAsync('SELECT * FROM cars WHERE id = ?', [id]);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    console.error('Get car error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching car'
    });
  }
});

// Create new car (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      name,
      brand,
      model,
      year,
      type,
      seats,
      price_per_day,
      description,
      image_url,
      features,
      status
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Car name is required'
      });
    }

    const result = await db.runAsync(
      `INSERT INTO cars (name, brand, model, year, type, seats, price_per_day, description, image_url, features, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, brand, model, year, type, seats, price_per_day, description, image_url, features, status || 'available']
    );

    res.status(201).json({
      success: true,
      message: 'Car added successfully',
      data: { id: result.id }
    });
  } catch (error) {
    console.error('Create car error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding car'
    });
  }
});

// Update car (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      brand,
      model,
      year,
      type,
      seats,
      price_per_day,
      description,
      image_url,
      features,
      status
    } = req.body;

    const car = await db.getAsync('SELECT * FROM cars WHERE id = ?', [id]);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    await db.runAsync(
      `UPDATE cars 
       SET name = ?, brand = ?, model = ?, year = ?, type = ?, seats = ?, 
           price_per_day = ?, description = ?, image_url = ?, features = ?, status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        name || car.name,
        brand || car.brand,
        model || car.model,
        year || car.year,
        type || car.type,
        seats || car.seats,
        price_per_day || car.price_per_day,
        description || car.description,
        image_url || car.image_url,
        features || car.features,
        status || car.status,
        id
      ]
    );

    res.json({
      success: true,
      message: 'Car updated successfully'
    });
  } catch (error) {
    console.error('Update car error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating car'
    });
  }
});

// Delete car (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const car = await db.getAsync('SELECT * FROM cars WHERE id = ?', [id]);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    await db.runAsync('DELETE FROM cars WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    console.error('Delete car error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting car'
    });
  }
});

module.exports = router;
