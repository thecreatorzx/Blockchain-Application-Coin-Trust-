// generateQR.js
const fs = require('fs');
const QRCode = require('qrcode');

// Data to encode in the QR code
const data = 'Hello, world!';

// Generate QR code
QRCode.toFile('./qr-code.png', data, (err) => {
  if (err) {
    console.error('Error generating QR code:', err);
  } else {
    console.log('QR code generated successfully!');
  }
});
