import sys
import re
import os

startind = '1'

startaddr = '../../data/topics_original/'+startind
saveaddr = '../../data/topics/'+startind

for filename in os.listdir(startaddr):
    print(filename)
    fullAddr = startaddr+'/'+filename
    lines = open(fullAddr).readlines()
    conversations = list(filter(None, list(map(lambda s: s[s.find(': ')+len('['):].strip(), lines))))

    text = ''
    for index, item in enumerate(conversations):
        if index%2 == 0:
            text += item
        else:
            text += '>>>'+item+'\n'
    text = text[:-1]

    if not os.path.exists(saveaddr):
        os.makedirs(saveaddr)
    text_file = open(saveaddr+'/'+filename, 'w')
    text_file.write(text)
    text_file.close()