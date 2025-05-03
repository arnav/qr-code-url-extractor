# QR Code URL Extractor

A simple web application that extracts URLs from QR code images copied to your clipboard.

![QR Code URL Extractor](https://via.placeholder.com/800x400?text=QR+Code+URL+Extractor)

## Features

- Extract URLs from QR codes with a single click
- Clipboard integration for easy image capture
- Visual feedback with QR code highlighting
- Direct URL opening capability
- Works entirely locally (no server required)
- Cross-browser compatibility
- Modern, clean user interface

## Requirements

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Clipboard permissions enabled in your browser
- For Mac users: ability to copy screenshots to clipboard (⌘+Shift+4, then Space, then click on window)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/qr-code-reader.git
   ```

2. Navigate to the project directory:
   ```
   cd qr-code-reader
   ```

3. Open `index.html` in your web browser:
   ```
   open index.html
   ```

No build process or server setup required!

## How to Use

1. **Copy a QR code image to your clipboard**
   - Take a screenshot of a QR code (on Mac: ⌘+Shift+4, select area)
   - Or copy any QR code image from your computer or the web

2. **Open the application in your browser**
   - Simply open the `index.html` file in any modern web browser

3. **Click the "Paste QR Code from Clipboard" button**
   - The application will request clipboard access (you may need to allow this)

4. **View the extracted URL**
   - If a valid QR code is detected, the URL will be displayed
   - A green outline will highlight the detected QR code
   - Click the "Open URL" button to visit the extracted link

## Technical Details

This application uses:
- HTML5 Clipboard API for accessing clipboard data
- Canvas API for image processing
- jsQR library for QR code detection and decoding
- Pure JavaScript with no framework dependencies

## Privacy

This application processes all data locally in your browser. No data is sent to any server, ensuring your QR codes and their contents remain private.

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
