# Russell Reynolds Associates Website

This folder contains all the necessary files for the Russell Reynolds Associates website. Follow the instructions below to launch the website locally.

## Quick Launch

1. Double-click the `launch_website.bat` file in this folder.
2. This will start a local web server and open your default browser to http://localhost:8000.
3. Click on the "Launch Website" button on the welcome page to access the full website.

**Important Note:** When you launch the website, you'll initially see the navigation menu of the Russell Reynolds website. This is normal and indicates the website is loading correctly. You can navigate through the website using this menu.

## Manual Launch (if the batch file doesn't work)

### Option 1: Using Python (recommended)

1. Open a command prompt or PowerShell window.
2. Navigate to this folder using the `cd` command.
3. Run the following command to start a simple HTTP server:
   ```
   python -m http.server 8000
   ```
   (If you don't have Python installed, you can download it from [python.org](https://www.python.org/downloads/))
4. Open your web browser and go to http://localhost:8000
5. Click on the "Launch Website" button or navigate directly to http://localhost:8000/www.russellreynolds.com/en/index.html

### Option 2: Using a different web server

You can use any web server software like XAMPP, WAMP, or Node.js http-server to serve these files.

## Troubleshooting

- **Only seeing the navigation menu**: This is normal. The website is designed to show the navigation menu first. You can navigate through the website using this menu. If you want to access the main page directly, use this URL: http://localhost:8000/www.russellreynolds.com/en/index.html
- **Missing images or styles**: Some 404 errors for images and styles are expected when running locally. The website will still function correctly despite these errors.
- **JavaScript errors**: Check the browser console (F12) for any specific errors.
- **404 errors**: Many 404 errors in the console are normal when running the site locally.
- **Permission issues**: If the batch file asks for administrator permissions, this is normal as it needs to start a web server.
- **Browser compatibility**: If you're having issues, try using a different browser like Chrome, Firefox, or Edge.

## Website Structure

- `www.russellreynolds.com/dist/`: Contains CSS, JavaScript, and image files
- `www.russellreynolds.com/en/index.html`: The main HTML file for the English version of the website

## Notes

- This is a local copy of the website and some features that require server-side processing may not work.
- External resources (like fonts from Google Fonts) will still be loaded from their original locations if you have an internet connection.