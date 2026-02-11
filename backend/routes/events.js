const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const { featured, limit, category } = req.query;
    let query = 'SELECT * FROM events WHERE status = "active"';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (featured === 'true') {
      query += ' AND featured = 1';
    }

    query += ' ORDER BY created_at DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const events = await db.allAsync(query, params);

    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching events'
    });
  }
});

// Get single event by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await db.getAsync('SELECT * FROM events WHERE id = ? AND status = "active"', [id]);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching event'
    });
  }
});

// Create new event (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      image_url,
      event_date,
      location,
      featured
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const result = await db.runAsync(
      `INSERT INTO events (title, description, category, image_url, event_date, location, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, category, image_url, event_date, location, featured ? 1 : 0]
    );

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: { id: result.id }
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating event'
    });
  }
});

// Update event (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      image_url,
      event_date,
      location,
      featured,
      status
    } = req.body;

    const event = await db.getAsync('SELECT * FROM events WHERE id = ?', [id]);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    await db.runAsync(
      `UPDATE events 
       SET title = ?, description = ?, category = ?, image_url = ?, 
           event_date = ?, location = ?, featured = ?, status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        title || event.title,
        description || event.description,
        category || event.category,
        image_url || event.image_url,
        event_date || event.event_date,
        location || event.location,
        featured !== undefined ? (featured ? 1 : 0) : event.featured,
        status || event.status,
        id
      ]
    );

    res.json({
      success: true,
      message: 'Event updated successfully'
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating event'
    });
  }
});

// Delete event (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const event = await db.getAsync('SELECT * FROM events WHERE id = ?', [id]);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    await db.runAsync('DELETE FROM events WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting event'
    });
  }
});

module.exports = router;
