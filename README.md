# chatbot-trainer

A chrome extension and related code for training the chatbot LightBlue.

## Workflow

The workflow of the whole set of code is:

1. Extract vocabulary words from the html page and save to file `voc.py`
2. Vocabulary analysis by `word2vec` and then plot the relationship between words
2. Do data preprocessing on raw training data
3. Manually revise the processed training data
4. Check vocabulary for training data
5. Train the chatbot by a chrome extension

Details will be explained below.

## Vocabulary Extraction

* Input html file: `/chatbot_metadata/voc.html`
* Expected Output txt file: `voc.txt`
* Not common words are saved at: `voc_special.txt`

Run:

```
python extract_voc.py
```

## Vocabulary analysis

Run:

```
sh setup.txt
cd word2vec
python word2vec.py
```

This TensorFlow program will download training data from http://mattmahoney.net/dc/text8 and train the `word2vec` network to obtain word embedding vectors for 50000 common words. Then you can get a plot of words in `voc.txt` to see their relationships. A sample plot can be found at `/word2vec/tsne_1000.png`.

![Relationships of first 1000 words in voc.txt](/word2vec/tsne_1000.png)

## Datasets

In my case, my training data is from [eslfast.com](https://www.eslfast.com/robot/).

* Put raw training data at `/chrome_ext/data/topics_original/$INDEX$`
* Expected formatted data will be saved at `/chrome_ext/data/topics/$INDEX$`

Change the `startind` at `data_processing/eslfast/main.py` to `$INDEX$`, then run:

```
cd data_processing/eslfast
python main.py
```

## Vocabulary Checking

* Input data is the modified conversations at `/chrome_ext/data/topics/$INDEX$`

Run

```
python check_voc.py
```
to see the words that not in `voc.txt`.

## Chrome Extension

* Load the unpacked extension in folder `/chrome_ext` to your Chrome follows [official guide](https://developer.chrome.com/extensions/getstarted#unpacked)
* Choose training file
* Click start

The extension will start new session when meet `<sss>` in training document, Q&A should be formatted as `$QUESTION$>>>$ANSWER$`. A sample can be found at: `/chrome_ext/data/topics/3/greeting`.

A demo video: https://youtu.be/flt2GLLF8so

![UI of the Chrome extension](/img/chrome_extension_ui.png)

## Authors

Derek Mingyu MA
hi@derek.ma | [derek.ma](https://derek.ma)

## Acknowledgements

Most of the `word2vec` implementation in TensorFlow is borrowed from https://github.com/tensorflow/tensorflow/blob/r1.4/tensorflow/examples/tutorials/word2vec/word2vec_basic.py.

The paper of `word2vec` can be found at: https://papers.nips.cc/paper/5021-distributed-representations-of-words-and-phrases-and-their-compositionality.pdf

