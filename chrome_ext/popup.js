/*
 *  INDIVIDUAL FUNCTIONS
 */
function talk(e){
    chrome.tabs.executeScript({
        code: 'location.href="javascript:ajaxSend(\'what is the weather\', [\'msgInput\',0]); void 0"'
      });
}
function modify(e){
    chrome.tabs.executeScript({
        // 1 is the value of onlychange
        // the text in the page will not change apprently, but actually it is changed
        code: 'location.href="javascript:ajaxSend(\'it is sunny\',[\'modifyChat\',1]); void 0"'
      });
    // chrome.tabs.executeScript(null,
    //     {code:"ajaxSend('it is sunny',['modifyChat',onlychange]);"});
}
function like(e){
    chrome.tabs.executeScript({
        code: 'location.href="javascript:ajaxSend(0,[\'Liked\',0]); void 0"'
    });
    // ajaxSend(0,['Liked',0]);
}
function newsession(e){
    // Start new session
    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
        chrome.tabs.update(tab.id, {url: "http://47.89.11.81/newsession/"});
    });
    // ajaxSend(0,['Liked',0]);
}
function ruminate(e){
    chrome.tabs.executeScript({
        code: 'location.href="javascript:ajaxSend(0, [\'Ruminate\',0]); void 0"'
    });
    // ajaxSend(0, ['Ruminate',0]);
}

/*
 *  MAIN FLOW
 */
function getBotStatus_script() {
    //You can play with your DOM here or check URL against your regex
    return document.getElementById('botspecial').getAttribute('src');
}

// export async function getBotStatus() {
//     chrome.tabs.executeScript({
//         code: '(' + getBotStatus_script + ')();'
//     }, (results) => {
//         //Here we have just the innerHTML and not DOM structure
//         if (results[0] === '/static/data/bot/Special/blank.gif'){
//             return 'empty';
//         } else{
//             return 'buzy';
//         }
//     });
// }

function someFunctionBig(a, b, callback){
    setTimeout(function(){

    },10000);
    // 10s
}

function someFunction(a, b, callback) {
    // Check whether can continue
    // 2s for the chatbot to think after modify
    setTimeout(function(){
        // after that if still thinking, think more 10s
        // otherwise continue
        chrome.tabs.executeScript({
            code: '(' + getBotStatus_script + ')();'
        }, (results) => {
            //Here we have just the innerHTML and not DOM structure
            if (results[0].substring(0,34) == '/static/data/bot/Special/blank.gif'){
                callback();
            } else{
                setTimeout(function () {
                    callback();
                },5000);
            }
        });
    }, 5000);
}

function start(e){
    // get settings
    fileName = document.getElementById('filechoose').value;
    indexNum = document.getElementById('indexchoose').value;
    var trainList = ["greetings1","greetings2","greetings3"];

    // TRAIN A FILE
    newsession();
    setTimeout(function(){
        var fullName = 'data/'+fileName+'.txt';
        displayMsgSmall(fileName);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', chrome.extension.getURL(fullName), true);
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
            {
                fileContent = xhr.responseText;
                lines = fileContent.split('\n');
                var thisIndex = 0;
                displayMsg("Start...");
                asyncLoop(lines.length, function(loop) {
                    someFunction(1, 2, function(result) {
                        thisIndex =  loop.iteration();
                        if(lines[thisIndex] == '<sss>'){
                            newsession();
                        } else{
                            trainThis(lines[thisIndex],thisIndex);
                        }
                        loop.next();
                    })},
                    function(){console.log('cycle ended')}
                );
            }
        };
        xhr.send();
    }, 1300);
}

function trainThis(item, index) {
    // train a conversation
    displayMsg(index+1);
    // input message
    [q,a] = item.split('>>>');
    chrome.tabs.executeScript({
        code: 'location.href="javascript:ajaxSend(\''+q+'\', [\'msgInput\',0]); void 0"'
      });
    // modify chat
    setTimeout(function(){
        chrome.tabs.executeScript({
            code: 'location.href="javascript:ajaxSend(\''+a+'\',[\'modifyChat\',1]); void 0"'
        });
    }, 2400);
    // // like revised message
    setTimeout(function(){
        like();
    }, 4000);
}

/*
 *  UTILITIES FUNCTIONS
 */
function displayMsg(msg){
    // Display current progress
    codetext = "document.getElementsByClassName('logo-lg')[0].innerHTML = \'"+msg+"\';"
    chrome.tabs.executeScript({
        code: codetext
    });
}

function displayMsgSmall(msg){
    // Display current progress
    codetext = "document.getElementsByClassName('hidden-xs')[0].innerHTML = \'"+msg+"\';"
    chrome.tabs.executeScript({
        code: codetext
    });
}

function asyncLoop(iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function() {
            if (done) {
                return;
            }

            if (index < iterations) {
                index++;
                func(loop);

            } else {
                done = true;
                callback();
            }
        },

        iteration: function() {
            return index - 1;
        },

        break: function() {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
}

/*
 *  EVENTS CONTROLLING
 */
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').addEventListener('click',start);
    document.getElementById('newsession').addEventListener('click',newsession);
    document.getElementById('talk').addEventListener('click',talk);
    document.getElementById('modify').addEventListener('click',modify);
    document.getElementById('like').addEventListener('click',like);
    document.getElementById('ruminate').addEventListener('click',ruminate);
});