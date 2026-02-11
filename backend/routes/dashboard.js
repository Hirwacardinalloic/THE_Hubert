const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Get dashboard statistics (protected)
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    // Count totals
    const eventsCount = await db.getAsync('SELECT COUNT(*) as count FROM events');
    const carsCount = await db.getAsync('SELECT COUNT(*) as count FROM cars');
    const toursCount = await db.getAsync('SELECT COUNT(*) as count FROM tours');
    const bookingsCount = await db.getAsync('SELECT COUNT(*) as count FROM bookings');
    const messagesCount = await db.getAsync('SELECT COUNT(*) as count FROM contact_messages');
    const projectsCount = await db.getAsync('SELECT COUNT(*) as count FROM projects');

    // Booking status breakdown
    const pendingBookings = await db.getAsync('SELECT COUNT(*) as count FROM bookings WHERE status = "pending"');
    const confirmedBookings = await db.getAsync('SELECT COUNT(*) as count FROM bookings WHERE status = "confirmed"');
    const completedBookings = await db.getAsync('SELECT COUNT(*) as count FROM bookings WHERE status = "completed"');
    const cancelledBookings = await db.getAsync('SELECT COUNT(*) as count FROM bookings WHERE status = "cancelled"');

    // Recent bookings
    const recentBookings = await db.allAsync('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5');

    // Recent messages
    const recentMessages = await db.allAsync('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5');

    // Bookings by type
    const bookingsByType = await db.allAsync(`
      SELECT booking_type, COUNT(*) as count 
      FROM bookings 
      GROUP BY booking_type
    `);

    // Monthly bookings (last 6 months)
    const monthlyBookings = await db.allAsync(`
      SELECT 
        strftime('%Y-%m', created_at) as month,
        COUNT(*) as count
      FROM bookings
      WHERE created_at >= date('now', '-6 months')
      GROUP BY strftime('%Y-%m', created_at)
      ORDER BY month
    `);

    res.json({
      success: true,
      data: {
        counts: {
          events: eventsCount.count,
          cars: carsCount.count,
          tours: toursCount.count,
          bookings: bookingsCount.count,
          messages: messagesCount.count,
          projects: projectsCount.count
        },
        bookings: {
          total: bookingsCount.count,
          pending: pendingBookings.count,
          confirmed: confirmedBookings.count,
          completed: completedBookings.count,
          cancelled: cancelledBookings.count,
          byType: bookingsByType,
          monthly: monthlyBookings
        },
        recent: {
          bookings: recentBookings,
          messages: recentMessages
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard statistics'
    });
  }
});

// Get recent activity (protected)
router.get('/activity', authenticateToken, async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Get recent bookings
    const recentBookings = await db.allAsync(`
      SELECT 
        'booking' as type,
        id,
        customer_name as title,
        booking_type as category,
        status,
        created_at
      FROM bookings
      ORDER BY created_at DESC
      LIMIT ?
    `, [parseInt(limit)]);

    // Get recent messages
    const recentMessages = await db.allAsync(`
      SELECT 
        'message' as type,
        id,
        name as title,
        subject as category,
        status,
        created_at
      FROM contact_messages
      ORDER BY created_at DESC
      LIMIT ?
    `, [parseInt(limit)]);

    // Combine and sort by date
    const activity = [...recentBookings, ...recentMessages]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      data: activity
    });
  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching activity'
    });
  }
});

module.exports = router;
