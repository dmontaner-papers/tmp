


1. I copied the original images in the `images_raw` folder.
2. I used GIMP to cut each of the images and save to `.png` files in the `images_raw` folder.
3. `d010_resize_images.py` resizes all cut images and saves them to folder `docs/images`
4. I use `d020_capture_rectangles_for_overlay.py` to capture all the outer rectangular regions with the labels. Saved in the `regions/regions.json` file.
5. `d030_scale_regions_as_rectangles.py` generates the scaled regions in the `docs/overlays.json` file. Here "polygon" is set by default to cover the entire rectangles.
   This step can be skipped if you run `d030_scale_regions_as_rectangles.py`.
6. I use `d040_capture_regions_for_overlay.py`
7. `d050_scale_regions_as_polygons.py` generates all the rectangles and internal polygons in the `docs/overlays.json` file.

