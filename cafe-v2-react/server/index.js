const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');
const cron = require('node-cron'); 

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '', // Make sure this matches your MySQL Workbench password configuration
    database: 'v2_cafe_local'
});

db.connect((err) => {
    if (err) {
        console.error('❌ MySQL Connection Error:', err.message);
    } else {
        console.log('✅ Connected to local MySQL v2_cafe_local database successfully!');
    }
});

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tantub412@gmail.com',
        pass: 'olsnlwoqrgtqaiei' 
    }
});

// ====================================================================
// ✅ FIXED DASHBOARD DATA API: Names match frontend expectations perfectly
// ====================================================================
app.get('/api/dashboard-analytics', (req, res) => {
    // Query 1: Get Total Summary Metrics
    const summaryQuery = "SELECT COUNT(id) AS total_items, IFNULL(SUM(price), 0) AS total_revenue FROM menu_items";
    
    // Query 2: Get Top 5 Selling Products Limited to 5
    const topProductsQuery = "SELECT item_name, category_name, id AS units_sold FROM menu_items ORDER BY id DESC LIMIT 5";
    
    // Query 3: Get Detailed Item List for Order Breakdown View
    const detailedItemsQuery = "SELECT id, item_name, variant_name, price, category_name FROM menu_items";

    db.query(summaryQuery, (err, summaryResults) => {
        if (err) return res.status(500).json({ error: err.message });
        
        db.query(topProductsQuery, (err, topResults) => {
            if (err) return res.status(500).json({ error: err.message });
            
            db.query(detailedItemsQuery, (err, detailResults) => {
                if (err) return res.status(500).json({ error: err.message });
                
                res.json({
                    summary: summaryResults[0] || { total_items: 0, total_revenue: 0 },
                    topProducts: topResults,
                    allMenuItems: detailResults // ✅ FIXED: Changed from orderDetails to allMenuItems to link with frontend states!
                });
            });
        });
    });
});

// Existing menu fallback route
app.get('/api/menu', (req, res) => {
    const query = "SELECT id, item_name, variant_name, price, category_name FROM menu_items";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a New Menu Item Row (Linked to frontend form submit handlers)
app.post('/api/menu-add', (req, res) => {
    const { item_name, category_name, variant_name, price } = req.body;
    const insertQuery = `
        INSERT INTO menu_items (item_name, category_name, variant_name, price) 
        VALUES (?, ?, ?, ?)
    `;
    db.query(insertQuery, [item_name, category_name, variant_name, price], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, insertId: result.insertId });
    });
});

// Delete a Menu Item Row (Linked to frontend list buttons)
app.delete('/api/menu-delete/:id', (req, res) => {
    const deleteQuery = "DELETE FROM menu_items WHERE id = ?";
    db.query(deleteQuery, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// ====================================================================
// ✅ API ROUTE: Triggered manually from OwnerPortal.js
// ====================================================================
app.post('/api/send-daily-report', (req, res) => {
    console.log('⏳ BACKEND RECEIVED REQUEST: Generating daily report...');

    const query = `
        SELECT 
            COUNT(id) AS total_items, 
            IFNULL(SUM(price), 0) AS average_value_tracked 
        FROM menu_items
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ Database error during daily report execution:', err.message);
            return res.status(500).json({ success: false, error: err.message });
        }

        const reportData = results[0];
        const totalItems = reportData.total_items;
        const totalValue = reportData.average_value_tracked;
        const todayDate = new Date().toLocaleDateString();

        const mailOptions = {
            from: `"V2 Cafe Automated Reports" <tantub412@gmail.com>`,
            to: 'tantub412@gmail.com', 
            subject: `📊 V2 Cafe Daily Analysis Report - ${todayDate}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">☕ V2 Cafe Daily Performance</h2>
                    <p style="color: #7f8c8d;">Here is the dashboard overview requested for today, <strong>${todayDate}</strong>.</p>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr style="background-color: #f8f9fa;">
                            <th style="text-align: left; padding: 12px; border-bottom: 1px solid #ddd;">Metric</th>
                            <th style="text-align: right; padding: 12px; border-bottom: 1px solid #ddd;">Value</th>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #ddd; color: #34495e;">Total Items Managed</td>
                            <td style="text-align: right; padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold; color: #2980b9;">${totalItems} Items</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #ddd; color: #34495e;">Tracked Catalog Cumulative Price</td>
                            <td style="text-align: right; padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold; color: #27ae60;">₹${totalValue}</td>
                        </tr>
                    </table>

                    <p style="font-size: 11px; color: #bdc3c7; margin-top: 30px; text-align: center;">
                        This is a system-generated report triggered from the Owner Dashboard.
                    </p>
                </div>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('❌ Failed to email daily report:', error.message);
                return res.status(500).json({ success: false, error: error.message });
            }
            console.log('✅ Daily report successfully delivered to owner:', info.response);
            res.status(200).json({ success: true, message: 'Report sent successfully!' });
        });
    });
});

// ====================================================================
// ✅ AUTOMATED CONCEPT: Automated Daily Cron Job Schedule
// ====================================================================
cron.schedule('30 21 * * *', () => {
    console.log(`[${new Date().toLocaleTimeString()}] 🕒 CRON TRIGGERED: Running automated daily sales analysis...`);

    const query = "SELECT COUNT(id) AS total_items, IFNULL(SUM(price), 0) AS average_value_tracked FROM menu_items";

    db.query(query, (err, results) => {
        if (err) return console.error('❌ Automated Cron Database Error:', err.message);

        const reportData = results[0];
        const totalItems = reportData.total_items;
        const totalValue = reportData.average_value_tracked;
        const todayDate = new Date().toLocaleDateString();

        const mailOptions = {
            from: `"V2 Cafe Automated Reports" <tantub412@gmail.com>`,
            to: 'tantub412@gmail.com', 
            subject: `📊 V2 Cafe Daily Analysis Report (Automated) - ${todayDate}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #2c3e50; border-bottom: 2px solid #e67e22; padding-bottom: 10px;">☕ V2 Cafe Daily Performance</h2>
                    <p style="color: #7f8c8d;">This is your scheduled daily update summary for <strong>${todayDate}</strong>.</p>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr style="background-color: #f8f9fa;">
                            <th style="text-align: left; padding: 12px; border-bottom: 1px solid #ddd;">Metric</th>
                            <th style="text-align: right; padding: 12px; border-bottom: 1px solid #ddd;">Value</th>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #ddd; color: #34495e;">Total Items Managed</td>
                            <td style="text-align: right; padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold; color: #2980b9;">${totalItems} Items</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #ddd; color: #34495e;">Tracked Catalog Cumulative Price</td>
                            <td style="text-align: right; padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold; color: #27ae60;">₹${totalValue}</td>
                        </tr>
                    </table>
                </div>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return console.error('❌ Automated Cron Email Delivery Failed:', error.message);
            console.log('✅ Automated Daily Report successfully mailed to owner:', info.response);
        });
    });
}, {
    scheduled: true,
    timezone: "Asia/Kolkata" 
});

app.listen(5000, () => {
    console.log('🚀 Backend server running on port 5000');
});