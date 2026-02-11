const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Get all tours (public)
router.get('/', async (req, res) => {
  try {
    const { featured, limit, destination, minPrice, maxPrice } = req.query;
    let query = 'SELECT * FROM tours WHERE status = "active"';
    const params = [];

    if (destination) {
      query += ' AND destination LIKE ?';
      params.push(`%${destination}%`);
    }

    if (minPrice) {
      query += ' AND price >= ?';
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(parseFloat(maxPrice));
    }

    if (featured === 'true') {
      query += ' AND featured = 1';
    }

    query += ' ORDER BY created_at DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const tours = await db.allAsync(query, params);

    res.json({
      success: true,
      count: tours.length,
      data: tours
    });
  } catch (error) {
    console.error('Get tours error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tours'
    });
  }
});

// Get single tour by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await db.getAsync('SELECT * FROM tours WHERE id = ? AND status = "active"', [id]);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.json({
      success: true,
      data: tour
    });
  } catch (error) {
    console.error('Get tour error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tour'
    });
  }
});

// Create new tour (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      description,
      destination,
      duration,
      price,
      image_url,
      itinerary,
      inclusions,
      exclusions,
      max_participants,
      featured
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Tour title is required'
      });
    }

    const result = await db.runAsync(
      `INSERT INTO tours (title, description, destination, duration, price, image_url, itinerary, inclusions, exclusions, max_participants, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, destination, duration, price, image_url, itinerary, inclusions, exclusions, max_participants, featured ? 1 : 0]
    );

    res.status(201).json({
      success: true,
      message: 'Tour created successfully',
      data: { id: result.id }
    });
  } catch (error) {
    console.error('Create tour error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating tour'
    });
  }
});

// Update tour (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      destination,
      duration,
      price,
      image_url,
      itinerary,
      inclusions,
      exclusions,
      max_participants,
      featured,
      status
    } = req.body;

    const tour = await db.getAsync('SELECT * FROM tours WHERE id = ?', [id]);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    await db.runAsync(
      `UPDATE tours 
       SET title = ?, description = ?, destination = ?, duration = ?, price = ?, 
           image_url = ?, itinerary = ?, inclusions = ?, exclusions = ?, 
           max_participants = ?, featured = ?, status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        title || tour.title,
        description || tour.description,
        destination || tour.destination,
        duration || tour.duration,
        price || tour.price,
        image_url || tour.image_url,
        itinerary || tour.itinerary,
        inclusions || tour.inclusions,
        exclusions || tour.exclusions,
        max_participants || tour.max_participants,
        featured !== undefined ? (featured ? 1 : 0) : tour.featured,
        status || tour.status,
        id
      ]
    );

    res.json({
      success: true,
      message: 'Tour updated successfully'
    });
  } catch (error) {
    console.error('Update tour error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating tour'
    });
  }
});

// Delete tour (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await db.getAsync('SELECT * FROM tours WHERE id = ?', [id]);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    await db.runAsync('DELETE FROM tours WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Tour deleted successfully'
    });
  } catch (error) {
    console.error('Delete tour error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting tour'
    });
  }
});

module.exports = router;
