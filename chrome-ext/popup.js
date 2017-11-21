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
    console.log("modify");
    chrome.tabs.executeScript(null,
        {code:"ajaxSend('it is sunny',['modifyChat',onlychange]);"});
}
function like(e){
    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
        chrome.tabs.update(tab.id, {url: "http://47.89.11.81/newsession/"});
    });
    // ajaxSend(0,['Liked',0]);
}
function ruminate(e){
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

document.addEventListener('DOMContentLoaded', function () {
//   var divs = document.querySelectorAll('div');
//   for (var i = 0; i < divs.length; i++) {
//     divs[i].addEventListener('click', click);
//   }
    document.getElementById('talk').addEventListener('click',talk);
    document.getElementById('modify').addEventListener('click',modify);
    document.getElementById('like').addEventListener('click',like);
    document.getElementById('ruminate').addEventListener('click',ruminate);
});