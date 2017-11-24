import sys
import re

def findLine(index):
    with open(fullAddrLines) as f:
        for line in f:
            if line.startswith(index):
                return line.split('+++$+++')[-1].strip()

fileNameLines = 'movie_lines_test.txt'
fileNameConv = 'movie_conversations_test.txt'
fullAddrLines = '../data/'+fileNameLines
fullAddrConv = '../data/'+fileNameConv

lines = open(fullAddrConv).readlines()
conversations = list(map(lambda s: s[s.find('[')+len('['):s.rfind(']')], lines))
statements = list(map(lambda x: x.split(','), conversations))

print(statements)
text = ''
for cvs in statements:
    for stm in cvs:
        text += findLine(stm.strip().strip('\''))
        text += '+++$+++'
    text = text[:-7]
    text += '\n'
text = text[:-1]

text_file = open("../data/output.txt", "w")
text_file.write(text)
text_file.close()