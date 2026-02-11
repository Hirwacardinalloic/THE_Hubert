const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    const result = await db.runAsync(
      `INSERT INTO contact_messages (name, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone, subject, message]
    );

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will get back to you soon!',
      data: { id: result.id }
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while sending message'
    });
  }
});

// Get all contact messages (protected)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, limit } = req.query;
    let query = 'SELECT * FROM contact_messages WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const messages = await db.allAsync(query, params);

    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contact messages'
    });
  }
});

// Get single contact message (protected)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const message = await db.getAsync('SELECT * FROM contact_messages WHERE id = ?', [id]);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Get contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching message'
    });
  }
});

// Update message status (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const message = await db.getAsync('SELECT * FROM contact_messages WHERE id = ?', [id]);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await db.runAsync(
      'UPDATE contact_messages SET status = ? WHERE id = ?',
      [status || message.status, id]
    );

    res.json({
      success: true,
      message: 'Message status updated successfully'
    });
  } catch (error) {
    console.error('Update contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating message'
    });
  }
});

// Delete contact message (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const message = await db.getAsync('SELECT * FROM contact_messages WHERE id = ?', [id]);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await db.runAsync('DELETE FROM contact_messages WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting message'
    });
  }
});

// Get unread message count (protected)
router.get('/stats/unread', authenticateToken, async (req, res) => {
  try {
    const result = await db.getAsync('SELECT COUNT(*) as count FROM contact_messages WHERE status = "unread"');

    res.json({
      success: true,
      data: { unreadCount: result.count }
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching unread count'
    });
  }
});

module.exports = router;
