import sys
import re
import os
from bs4 import BeautifulSoup

filename = 'chatbot_metadata/voc.html'
doc = open(filename).read()

soup = BeautifulSoup(doc)
table = soup.find("table", attrs={"class":"details"})

text = ''
for row in table.find_all("tr"):
    for td in row.find_all("td"):
        text += td.get_text() + '\n'
text = text[:-1]

text_file = open("../voc.txt", "w")
text_file.write(text)
text_file.close()