# import numpy as np
import os
import json
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from matplotlib.widgets import RectangleSelector, TextBox, Button

os.makedirs("regions", exist_ok=True)

i = "01"
img_file = f"docs/images/img{i}.png"
regions_file = f"regions/regions_img{i}.json"

img = mpimg.imread(img_file)
print("Image shape:", img.shape)
# plt.imshow(img)
# plt.axis("on")
# plt.title("my title")

regions = []
current_rect = {}

# Load regions from file if it exists
if os.path.exists(regions_file):
    with open(regions_file, "r") as f:
        try:
            regions = json.load(f)
            print(f"Loaded {len(regions)} regions from {regions_file}")
        except Exception as e:
            print(f"Could not load regions: {e}")


def onselect(eclick, erelease):
    global current_rect
    x1, y1 = int(round(eclick.xdata)), int(round(eclick.ydata))
    x2, y2 = int(round(erelease.xdata)), int(round(erelease.ydata))
    current_rect = {
        "x1": min(x1, x2),
        "y1": min(y1, y2),
        "x2": max(x1, x2),
        "y2": max(y1, y2),
    }
    print(f"Selected rectangle: {current_rect}")
    text_box.set_val("")  # Clear previous label
    plt.draw()


def on_confirm(event):
    label = text_box.text
    if current_rect and label:
        region = current_rect.copy()
        region["label"] = label
        regions.append(region)
        print(f"Region captured: {region}")
        print(f"All regions: {json.dumps(regions, indent=2)}")
        # Save regions to file
        with open(regions_file, "w") as f:
            json.dump(regions, f, indent=2)
        print(f"Saved {len(regions)} regions to {regions_file}")
    else:
        print("No region or label provided.")


fig, ax = plt.subplots()
plt.subplots_adjust(left=0, right=1, top=1, bottom=0.18)
ax.imshow(img)
# plt.title("Draw rectangle, enter label, and confirm")

rect_selector = RectangleSelector(
    ax,
    onselect,
    useblit=True,
    button=[1],
    minspanx=5,
    minspany=5,
    spancoords="pixels",
    interactive=True,
)

axbox = plt.axes([0.1, 0.1, 0.3, 0.05])
text_box = TextBox(axbox, "Label: ")

axbutton = plt.axes([0.5, 0.1, 0.15, 0.05])
button = Button(axbutton, "Confirm")
button.on_clicked(on_confirm)

plt.show()
