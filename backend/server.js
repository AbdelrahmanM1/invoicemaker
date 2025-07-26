const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// In-memory storage (replace with database in production)
let templates = [
  {
    id: 'template-1',
    name: 'Modern Professional',
    category: 'business',
    preview: '/previews/modern-professional.jpg',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <header style="border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h1 style="color: #2563eb; margin: 0;">INVOICE</h1>
              <p style="margin: 5px 0; color: #6b7280;">Invoice #{{invoiceNumber}}</p>
            </div>
            <div style="text-align: right;">
              <p style="margin: 0; font-weight: bold;">{{companyName}}</p>
              <p style="margin: 5px 0;">{{companyAddress}}</p>
              <p style="margin: 5px 0;">{{companyEmail}}</p>
            </div>
          </div>
        </header>
        <div style="margin-bottom: 30px;">
          <h3 style="color: #374151;">Bill To:</h3>
          <p style="margin: 5px 0; font-weight: bold;">{{clientName}}</p>
          <p style="margin: 5px 0;">{{clientAddress}}</p>
          <p style="margin: 5px 0;">{{clientEmail}}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 12px; text-align: left; border: 1px solid #d1d5db;">Description</th>
              <th style="padding: 12px; text-align: center; border: 1px solid #d1d5db;">Qty</th>
              <th style="padding: 12px; text-align: right; border: 1px solid #d1d5db;">Rate</th>
              <th style="padding: 12px; text-align: right; border: 1px solid #d1d5db;">Amount</th>
            </tr>
          </thead>
          <tbody>
            {{#items}}
            <tr>
              <td style="padding: 12px; border: 1px solid #d1d5db;">{{description}}</td>
              <td style="padding: 12px; text-align: center; border: 1px solid #d1d5db;">{{quantity}}</td>
              <td style="padding: 12px; text-align: right; border: 1px solid #d1d5db;">${{rate}}</td>
              <td style="padding: 12px; text-align: right; border: 1px solid #d1d5db;">${{amount}}</td>
            </tr>
            {{/items}}
          </tbody>
        </table>
        <div style="text-align: right; margin-bottom: 30px;">
          <div style="display: inline-block; text-align: right;">
            <p style="margin: 5px 0;"><strong>Subtotal: ${{subtotal}}</strong></p>
            <p style="margin: 5px 0;"><strong>Tax ({{taxRate}}%): ${{tax}}</strong></p>
            <h3 style="margin: 10px 0; color: #2563eb;">Total: ${{total}}</h3>
          </div>
        </div>
        <footer style="border-top: 1px solid #e5e7eb; padding-top: 20px; color: #6b7280;">
          <p>Thank you for your business!</p>
          <p>Payment Terms: {{paymentTerms}}</p>
        </footer>
      </div>
    `
  },
  {
    id: 'template-2',
    name: 'Creative Design',
    category: 'creative',
    preview: '/previews/creative-design.jpg',
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 800px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
        <header style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 3em; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">INVOICE</h1>
          <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin-top: 20px;">
            <p style="margin: 0; font-size: 1.2em;">Invoice #{{invoiceNumber}}</p>
            <p style="margin: 5px 0;">Date: {{invoiceDate}}</p>
          </div>
        </header>
        <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
          <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; flex: 1; margin-right: 20px;">
            <h3 style="margin-top: 0; color: #fbbf24;">From:</h3>
            <p style="margin: 5px 0; font-weight: bold;">{{companyName}}</p>
            <p style="margin: 5px 0;">{{companyAddress}}</p>
            <p style="margin: 5px 0;">{{companyEmail}}</p>
          </div>
          <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; flex: 1;">
            <h3 style="margin-top: 0; color: #fbbf24;">To:</h3>
            <p style="margin: 5px 0; font-weight: bold;">{{clientName}}</p>
            <p style="margin: 5px 0;">{{clientAddress}}</p>
            <p style="margin: 5px 0;">{{clientEmail}}</p>
          </div>
        </div>
        <div style="background: rgba(255,255,255,0.95); color: #333; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                <th style="padding: 15px; text-align: left;">Description</th>
                <th style="padding: 15px; text-align: center;">Qty</th>
                <th style="padding: 15px; text-align: right;">Rate</th>
                <th style="padding: 15px; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              {{#items}}
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px;">{{description}}</td>
                <td style="padding: 15px; text-align: center;">{{quantity}}</td>
                <td style="padding: 15px; text-align: right;">${{rate}}</td>
                <td style="padding: 15px; text-align: right;">${{amount}}</td>
              </tr>
              {{/items}}
            </tbody>
          </table>
        </div>
        <div style="text-align: right; background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
          <p style="margin: 5px 0; font-size: 1.1em;">Subtotal: ${{subtotal}}</p>
          <p style="margin: 5px 0; font-size: 1.1em;">Tax ({{taxRate}}%): ${{tax}}</p>
          <h2 style="margin: 10px 0; color: #fbbf24; font-size: 1.5em;">Total: ${{total}}</h2>
        </div>
        <footer style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.3);">
          <p style="font-style: italic;">Thank you for choosing our services!</p>
          <p>Payment Terms: {{paymentTerms}}</p>
        </footer>
      </div>
    `
  },
  {
    id: 'template-3',
    name: 'Minimalist Clean',
    category: 'minimal',
    preview: '/previews/minimalist-clean.jpg',
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #333;">
        <header style="margin-bottom: 50px;">
          <h1 style="font-size: 2.5em; font-weight: 300; margin: 0; letter-spacing: -1px;">Invoice</h1>
          <div style="margin-top: 20px; font-size: 0.9em; color: #666;">
            <p style="margin: 0;">{{invoiceNumber}} • {{invoiceDate}}</p>
          </div>
        </header>
        <div style="display: flex; justify-content: space-between; margin-bottom: 50px; font-size: 0.9em;">
          <div>
            <h4 style="margin: 0 0 10px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">From</h4>
            <p style="margin: 3px 0; font-weight: 500;">{{companyName}}</p>
            <p style="margin: 3px 0; color: #666;">{{companyAddress}}</p>
            <p style="margin: 3px 0; color: #666;">{{companyEmail}}</p>
          </div>
          <div style="text-align: right;">
            <h4 style="margin: 0 0 10px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">To</h4>
            <p style="margin: 3px 0; font-weight: 500;">{{clientName}}</p>
            <p style="margin: 3px 0; color: #666;">{{clientAddress}}</p>
            <p style="margin: 3px 0; color: #666;">{{clientEmail}}</p>
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 50px; font-size: 0.9em;">
          <thead>
            <tr style="border-bottom: 2px solid #eee;">
              <th style="padding: 15px 0; text-align: left; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Description</th>
              <th style="padding: 15px 0; text-align: center; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Qty</th>
              <th style="padding: 15px 0; text-align: right; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Rate</th>
              <th style="padding: 15px 0; text-align: right; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #999;">Amount</th>
            </tr>
          </thead>
          <tbody>
            {{#items}}
            <tr style="border-bottom: 1px solid #f5f5f5;">
              <td style="padding: 20px 0;">{{description}}</td>
              <td style="padding: 20px 0; text-align: center;">{{quantity}}</td>
              <td style="padding: 20px 0; text-align: right;">${{rate}}</td>
              <td style="padding: 20px 0; text-align: right; font-weight: 500;">${{amount}}</td>
            </tr>
            {{/items}}
          </tbody>
        </table>
        <div style="margin-left: auto; width: 300px; font-size: 0.9em;">
          <div style="padding: 15px 0; border-bottom: 1px solid #f5f5f5; display: flex; justify-content: space-between;">
            <span>Subtotal</span>
            <span>${{subtotal}}</span>
          </div>
          <div style="padding: 15px 0; border-bottom: 1px solid #f5f5f5; display: flex; justify-content: space-between;">
            <span>Tax ({{taxRate}}%)</span>
            <span>${{tax}}</span>
          </div>
          <div style="padding: 20px 0; display: flex; justify-content: space-between; font-size: 1.2em; font-weight: 600;">
            <span>Total</span>
            <span>${{total}}</span>
          </div>
        </div>
        <footer style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #eee; font-size: 0.8em; color: #999; text-align: center;">
          <p style="margin: 0;">Payment Terms: {{paymentTerms}}</p>
        </footer>
      </div>
    `
  }
];

let savedInvoices = {};
let previewLinks = {};

// Routes

// Get all templates
app.get('/api/templates', (req, res) => {
  try {
    const templatesWithoutHTML = templates.map(template => ({
      id: template.id,
      name: template.name,
      category: template.category,
      preview: template.preview
    }));
    
    res.json({
      success: true,
      templates: templatesWithoutHTML
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch templates',
      error: error.message
    });
  }
});

// Get specific template by ID
app.get('/api/templates/:id', (req, res) => {
  try {
    const { id } = req.params;
    const template = templates.find(t => t.id === id);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }
    
    res.json({
      success: true,
      template: template
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch template',
      error: error.message
    });
  }
});

// Create preview link
app.post('/api/preview', (req, res) => {
  try {
    const { templateId, invoiceData } = req.body;
    
    if (!templateId || !invoiceData) {
      return res.status(400).json({
        success: false,
        message: 'Template ID and invoice data are required'
      });
    }
    
    const template = templates.find(t => t.id === templateId);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }
    
    const previewId = uuidv4();
    const previewUrl = `/preview/${previewId}`;
    
    // Store preview data
    previewLinks[previewId] = {
      templateId,
      invoiceData,
      createdAt: new Date(),
      template: template
    };
    
    res.json({
      success: true,
      previewUrl: previewUrl,
      previewId: previewId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create preview',
      error: error.message
    });
  }
});

// Render preview
app.get('/preview/:id', (req, res) => {
  try {
    const { id } = req.params;
    const previewData = previewLinks[id];
    
    if (!previewData) {
      return res.status(404).send('Preview not found or expired');
    }
    
    let html = previewData.template.html;
    const data = previewData.invoiceData;
    
    // Simple template engine (replace with handlebars for production)
    html = html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] || '';
    });
    
    // Handle items array
    if (data.items && Array.isArray(data.items)) {
      const itemsRegex = /\{\{#items\}\}([\s\S]*?)\{\{\/items\}\}/g;
      html = html.replace(itemsRegex, (match, itemTemplate) => {
        return data.items.map(item => {
          return itemTemplate.replace(/\{\{(\w+)\}\}/g, (itemMatch, itemKey) => {
            return item[itemKey] || '';
          });
        }).join('');
      });
    }
    
    res.send(html);
  } catch (error) {
    res.status(500).send('Error rendering preview');
  }
});

// Export as PDF
app.post('/api/export/pdf', async (req, res) => {
  try {
    const { previewId } = req.body;
    
    if (!previewId) {
      return res.status(400).json({
        success: false,
        message: 'Preview ID is required'
      });
    }
    
    const previewData = previewLinks[previewId];
    if (!previewData) {
      return res.status(404).json({
        success: false,
        message: 'Preview not found'
      });
    }
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Get the preview URL
    const previewUrl = `http://localhost:${PORT}/preview/${previewId}`;
    await page.goto(previewUrl, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    await browser.close();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${previewId}.pdf`);
    res.send(pdf);
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to export PDF',
      error: error.message
    });
  }
});

// Export as PNG
app.post('/api/export/png', async (req, res) => {
  try {
    const { previewId } = req.body;
    
    if (!previewId) {
      return res.status(400).json({
        success: false,
        message: 'Preview ID is required'
      });
    }
    
    const previewData = previewLinks[previewId];
    if (!previewData) {
      return res.status(404).json({
        success: false,
        message: 'Preview not found'
      });
    }
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 1200 });
    
    const previewUrl = `http://localhost:${PORT}/preview/${previewId}`;
    await page.goto(previewUrl, { waitUntil: 'networkidle0' });
    
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: true
    });
    
    await browser.close();
    
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${previewId}.png`);
    res.send(screenshot);
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to export PNG',
      error: error.message
    });
  }
});

// Save invoice
app.post('/api/invoices/save', (req, res) => {
  try {
    const { invoiceId, templateId, invoiceData } = req.body;
    
    if (!invoiceId || !templateId || !invoiceData) {
      return res.status(400).json({
        success: false,
        message: 'Invoice ID, template ID, and invoice data are required'
      });
    }
    
    savedInvoices[invoiceId] = {
      templateId,
      invoiceData,
      savedAt: new Date(),
      updatedAt: new Date()
    };
    
    res.json({
      success: true,
      message: 'Invoice saved successfully',
      invoiceId: invoiceId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save invoice',
      error: error.message
    });
  }
});

// Get saved invoice
app.get('/api/invoices/:id', (req, res) => {
  try {
    const { id } = req.params;
    const invoice = savedInvoices[id];
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }
    
    res.json({
      success: true,
      invoice: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invoice',
      error: error.message
    });
  }
});

// Get all saved invoices
app.get('/api/invoices', (req, res) => {
  try {
    const invoicesList = Object.entries(savedInvoices).map(([id, invoice]) => ({
      id,
      templateId: invoice.templateId,
      invoiceNumber: invoice.invoiceData.invoiceNumber,
      clientName: invoice.invoiceData.clientName,
      total: invoice.invoiceData.total,
      savedAt: invoice.savedAt,
      updatedAt: invoice.updatedAt
    }));
    
    res.json({
      success: true,
      invoices: invoicesList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invoices',
      error: error.message
    });
  }
});

// Update templates (for when new templates are added)
app.post('/api/templates/update', (req, res) => {
  try {
    const { newTemplates } = req.body;
    
    if (!newTemplates || !Array.isArray(newTemplates)) {
      return res.status(400).json({
        success: false,
        message: 'New templates array is required'
      });
    }
    
    // Add new templates that don't exist
    newTemplates.forEach(newTemplate => {
      if (!templates.find(t => t.id === newTemplate.id)) {
        templates.push(newTemplate);
      }
    });
    
    res.json({
      success: true,
      message: 'Templates updated successfully',
      totalTemplates: templates.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update templates',
      error: error.message
    });
  }
});

// Clean up expired preview links (runs every hour)
setInterval(() => {
  const now = new Date();
  const expiredTime = 24 * 60 * 60 * 1000; // 24 hours
  
  Object.keys(previewLinks).forEach(id => {
    if (now - previewLinks[id].createdAt > expiredTime) {
      delete previewLinks[id];
    }
  });
}, 60 * 60 * 1000);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`Invoice API Server running on port ${PORT}`);
  console.log(`Preview URLs will be available at http://localhost:${PORT}/preview/:id`);
});

module.exports = app;