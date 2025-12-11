import pandas as pd
import matplotlib.image as mpimg

img_file = "docs/images/img01.png"
regions_file = "regions/regions_img01.json"

img = mpimg.imread(img_file)
tot_ht, tot_wd, _ = img.shape


df = pd.read_json(regions_file)
df = df[['label', 'x1', 'y1', 'x2', 'y2']].rename(columns={"label": "hotspot"})
df['question'] = df['hotspot'].str.split("_").str[0]
df['response'] = df['hotspot'].str.split("_").str[1].str.split(".").str[0].astype(int)
df[['q', 'r']] = df['hotspot'].str.replace('q', '').str.split("_", expand=True).astype(float)
df = df.sort_values(['q', 'r'])
df

df["wd"] = df["x2"] - df["x1"]
df["ht"] = df["y2"] - df["y1"]

df["width"]  = (100 * df["wd"] / tot_wd).round(2).astype(str) + "%"
df["height"] = (100 * df["ht"] / tot_ht).round(2).astype(str) + "%"

df["left"] = (100 * df["x1"] / tot_wd).round(2).astype(str) + "%"
df["top"]  = (100 * df["y1"] / tot_ht).round(2).astype(str) + "%"

mycols = ['hotspot', 'question', 'response', 'left', 'top', 'width', 'height']
template = '    <div class="overlay" id="{hotspot}" question="{group}" response={response} style="position: absolute; left: {left}; top: {top}; width: {width}; height: {height};"><span class="check-icon">✔️</span></div>'

for _, hotspot, group, response, left, top, width, height in df[mycols].itertuples():
    print(template.format(hotspot=hotspot, group=group, response=response, left=left, top=top, width=width, height=height))
