// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function click(e) {
//   chrome.tabs.executeScript(null,
    // //   {code:"document.body.style.backgroundColor='" + e.target.id + "'"}
    //   {code:"document.getElementById('login-button').click();"});
    // // {code:" window.location.href = 'https://www38.polyu.edu.hk/eStudent/secure/my-subject-registration/subject-register-select-acad-year-sem.jsf';\
    // //         var box1 = document.getElementById('mainForm:yearSemDropDown'); \
    // //         box1.value = 1495;\
    // //         document.getElementById('mainForm:nextButton').click();\
    // //   "});

    // chrome.tabs.executeScript(null,
    //       {code:"window.location.href = 'https://www38.polyu.edu.hk/eStudent/secure/my-subject-registration/subject-register-select-acad-year-sem.jsf';"});
    
    chrome.tabs.executeScript({
        file: 'simulate.js'
    });  
  window.close();
}

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
    // Start new session
    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
        chrome.tabs.update(tab.id, {url: "http://47.89.11.81/newsession/"});
    });
    // ajaxSend(0,['Liked',0]);
}
function ruminate(e){
    // Read txt file
    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL('test.txt'), true);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
        {
            document.getElementById("display").innerHTML = xhr.responseText;
        }
    };
    xhr.send();
    // ajaxSend(0, ['Ruminate',0]);
}

async function start(e){
    displayMsg(">>> START >>>");
    setTimeout(function () {
        // get settings
        fileNum = document.getElementById('filechoose').value;
        indexNum = document.getElementById('indexchoose').value;

        var fullName = fileNum+'.txt';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', chrome.extension.getURL(fullName), true);
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
            {
                fileContent = xhr.responseText;
                lines = fileContent.split('\n');
                for (var i = 0; i < lines.length; i++){
                    var tempResult = await trainThis(item, index);
                }
                // lines.forEach(function(item, index){
                //     trainThis(item, index);
                // });
            }
        };
        xhr.send();
    }, 2000);
}

async function trainThis(item, index) {
    alert("herer");
    displayMsg(item);
    setTimeout(function(){
        return 'yes'
    }, 1000);
    // return new Promise((resolve, reject) => {
    //     asycronouseProcess(()=>{
    //       resolve();
    //     })
    //   })
}

// EVENTS CONTROLLING

document.addEventListener('DOMContentLoaded', function () {
//   var divs = document.querySelectorAll('div');
//   for (var i = 0; i < divs.length; i++) {
//     divs[i].addEventListener('click', click);
//   }
    document.getElementById('start').addEventListener('click',start);
    document.getElementById('talk').addEventListener('click',talk);
    document.getElementById('modify').addEventListener('click',modify);
    document.getElementById('like').addEventListener('click',like);
    document.getElementById('ruminate').addEventListener('click',ruminate);
});

// UTILITIES FUNCTIONS
function displayMsg(msg){
    // Display current progress
    codetext = "document.getElementsByClassName('logo-lg')[0].innerHTML = \'"+msg+"\';"
    chrome.tabs.executeScript({
        code: codetext
    });
}

function readFile(fileNumber){
    // Read txt file
    var fullName = fileNumber+'.txt';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL(fullName), true);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
        {
            return xhr.responseText;
        }
    };
    xhr.send();
    // ajaxSend(0, ['Ruminate',0]);
}