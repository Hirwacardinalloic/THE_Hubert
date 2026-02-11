const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Get all bookings (protected - admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, booking_type, limit } = req.query;
    let query = 'SELECT * FROM bookings WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (booking_type) {
      query += ' AND booking_type = ?';
      params.push(booking_type);
    }

    query += ' ORDER BY created_at DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const bookings = await db.allAsync(query, params);

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
});

// Get single booking by ID (protected)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await db.getAsync('SELECT * FROM bookings WHERE id = ?', [id]);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking'
    });
  }
});

// Create new booking (public)
router.post('/', async (req, res) => {
  try {
    const {
      booking_type,
      service_id,
      customer_name,
      customer_email,
      customer_phone,
      booking_date,
      start_date,
      end_date,
      number_of_guests,
      message
    } = req.body;

    if (!booking_type || !customer_name || !customer_email) {
      return res.status(400).json({
        success: false,
        message: 'Booking type, customer name, and email are required'
      });
    }

    const result = await db.runAsync(
      `INSERT INTO bookings (booking_type, service_id, customer_name, customer_email, customer_phone, booking_date, start_date, end_date, number_of_guests, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [booking_type, service_id, customer_name, customer_email, customer_phone, booking_date, start_date, end_date, number_of_guests, message]
    );

    // Here you could integrate WhatsApp API notification
    // For now, we'll just mark it as pending notification

    res.status(201).json({
      success: true,
      message: 'Booking created successfully. We will contact you soon!',
      data: { id: result.id }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking'
    });
  }
});

// Update booking status (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status,
      total_amount,
      whatsapp_notified
    } = req.body;

    const booking = await db.getAsync('SELECT * FROM bookings WHERE id = ?', [id]);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    await db.runAsync(
      `UPDATE bookings 
       SET status = ?, total_amount = ?, whatsapp_notified = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        status || booking.status,
        total_amount || booking.total_amount,
        whatsapp_notified !== undefined ? whatsapp_notified : booking.whatsapp_notified,
        id
      ]
    );

    res.json({
      success: true,
      message: 'Booking updated successfully'
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating booking'
    });
  }
});

// Delete booking (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await db.getAsync('SELECT * FROM bookings WHERE id = ?', [id]);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    await db.runAsync('DELETE FROM bookings WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting booking'
    });
  }
});

// Get booking statistics (protected)
router.get('/stats/overview', authenticateToken, async (req, res) => {
  try {
    const totalBookings = await db.getAsync('SELECT COUNT(*) as count FROM bookings');
    const pendingBookings = await db.getAsync('SELECT COUNT(*) as count FROM bookings WHERE status = "pending"');
    const confirmedBookings = await db.getAsync('SELECT COUNT(*) as count FROM bookings WHERE status = "confirmed"');
    const completedBookings = await db.getAsync('SELECT COUNT(*) as count FROM bookings WHERE status = "completed"');

    const bookingsByType = await db.allAsync(`
      SELECT booking_type, COUNT(*) as count 
      FROM bookings 
      GROUP BY booking_type
    `);

    res.json({
      success: true,
      data: {
        total: totalBookings.count,
        pending: pendingBookings.count,
        confirmed: confirmedBookings.count,
        completed: completedBookings.count,
        byType: bookingsByType
      }
    });
  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking statistics'
    });
  }
});

module.exports = router;
