# a program to check whether all words in coming training data are all in vocabulary
import sys
import re
import os

startind = '1'
startaddr = 'data/topics/'+startind

for filename in os.listdir(startaddr):
    if (filename != '.DS_Store'):
        print('-------------'+filename+'---------------')
        lines = open(startaddr+'/'+filename).readlines()
        conversations = list(map(lambda s: s[:-1].split('>>>'), lines)) # remove new line
        conversations_flat = [x for sublist in conversations for x in sublist]
        words = list(map(lambda x: re.sub('[,.?!]', '', x).split(' '), conversations_flat)) # remove ,.?!
        words_flat = [x for sublist in words for x in sublist]
        # statements_flat is the list with all indiviudal words

        vocname = 'voc.txt'
        voc = open(vocname).readlines()
        voc = list(map(lambda s: s[:-1], voc))
        difference = set(words_flat)-{e for e in words_flat if e in voc}
        print(difference)