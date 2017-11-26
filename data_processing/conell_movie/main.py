import sys
import re

def findLine(index):
    with open(fullAddrLines) as f:
        for line in f:
            if line.startswith(index):
                return line.split('+++$+++')[-1].strip()

fileNameLines = 'movie_lines.txt'
fileNameConv = 'movie_conversations.txt'
fullAddrLines = '../data/'+fileNameLines
fullAddrConv = '../data/'+fileNameConv

lines = open(fullAddrConv).readlines()
conversations = list(map(lambda s: s[s.find('[')+len('['):s.rfind(']')], lines))
statements = list(map(lambda x: x.split(','), conversations))

# print(statements)
text = ''
count = 1
for cvs in statements[1:300]:
    print(count)
    for stm in cvs:
        text += findLine(stm.strip().strip('\''))
        text += '+++$+++'
    text = text[:-7]
    text += '\n'
    count += 1
text = text[:-1]

text_file = open("../data/output.txt", "w")
text_file.write(text)
text_file.close()