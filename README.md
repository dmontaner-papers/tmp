


1. I copied the original images in the `images_raw` folder.
2. I used GIMP to cut each of the images and save to `.png` files in the `images_raw` folder.
3. `d010_resize_images.py` resizes all cut images and saves them to folder `docs/images`
4. I use `d020_capture_rectangles_for_overlay.py` to capture all the outer rectangular regions with the labels. Saved in the `regions/regions.json` file.
5. `d030_scale_regions_as_rectangles.py` generates the scaled regions in the `docs/overlays.json` file. Here "polygon" is set by default to cover the entire rectangles.
   This step can be skipped if you run `d030_scale_regions_as_rectangles.py`.
6. I use `d040_capture_regions_for_overlay.py`
7. `d050_scale_regions_as_polygons.py` generates all the rectangles and internal polygons in the `docs/overlays.json` file.


Here's how to use this Google Apps Script with Google Sheets:

**1. Set up the Google Sheet:**
   - Open Google Sheets and create a new spreadsheet
   - Create a sheet named `"Responses"` (the script looks for this exact name)
   - Add column headers in the first row:
     - Column A: Timestamp
     - Column B: Consent
     - Column C: Consent Timestamp
     - Columns D-R: q01, q02, q03, ... q15

**2. Add the script to Google Sheets:**
   - In your Google Sheet, go to **Extensions → Apps Script**
   - Delete any default code and paste your script
   - Save it

**3. Deploy as a Web App:**
   - Click **Deploy** → **New deployment**
   - Select **Type: Web app**
   - Set **Execute as:** your Google account
   - Set **Who has access:** Anyone (or "Anyone with the link")
   - Click **Deploy**

HERE GOOGLE ASKS FOR AUTHORIZATION

   - Copy the deployment URL (looks like: `https://script.google.com/macros/s/AKfycbw7.../exec`)

   https://script.google.com/macros/s/AKfycbyyT38aR6S0JfMK24m64pJuYPca9WvVN9p1--NSCioCsU_CDQvKVaQgppHrS0Y4SQ0G/exec

**4. Use the URL in your questionnaire:**
   - Replace the `SCRIPT_URL` in your questionnaire.html with the deployment URL you just copied
   - When users submit, the POST request sends the JSON data to this URL
   - The script automatically parses it and appends a new row to your "Responses" sheet

**That's it!** Each submission will add a new row with all the response data.


User Journey 

1. index.html
1. questionnaire.html
1. extras.html
1. send.html
1. done.html
