import sys
import re
import os

startind = '2'

startaddr = '../../chrome_ext/data/topics_original/'+startind
saveaddr = '../../chrome_ext/data/topics/'+startind
specialwords = ['I']

for filename in os.listdir(startaddr):
    if (filename != '.DS_Store'):
        print(filename)
        fullAddr = startaddr+'/'+filename
        lines = open(fullAddr).readlines()
        conversations = list(filter(None, list(map(lambda s: s[s.find(': ')+len('['):].strip(), lines))))

        text = ''
        for index, item in enumerate(conversations):
            toLower = lambda x: " ".join( a if a in specialwords else a.lower()
                        for a in x.split() )
            newitem = toLower(item)
            if index%2 == 0:
                text += newitem
            else:
                text += '>>>'+newitem+'\n'
        # note there is \n at the last of the file, but it's correct

        if not os.path.exists(saveaddr):
            os.makedirs(saveaddr)
        text_file = open(saveaddr+'/'+filename, 'w')
        text_file.write(text)
        text_file.close()