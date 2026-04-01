with open("index.html", "r") as f:
    text = f.read()

text = text.replace("assets/images/foto-prensa-blanco-negro-axl-lake.webp", "assets/images/foto-prensa-blanco-negro-axl-lake-v2.webp")

with open("index.html", "w") as f:
    f.write(text)
