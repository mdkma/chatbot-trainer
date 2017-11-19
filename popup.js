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
    // console.log("talk");
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.executeScript(tab.id, {code: "ajaxSend('what is the weather', ['msgInput',0]);"}, function(response) {
            alert('test');
        });
    });
    // chrome.tabs.executeScript(null,
    //       {code:"ajaxSend('what is the weather', ['msgInput',0]);"});
}
function modify(e){
    console.log("modify");
    chrome.tabs.executeScript(null,
        {code:"ajaxSend('it is sunny',['modifyChat',onlychange]);"});
}
function like(e){
    console.log("like");
    chrome.tabs.executeScript(null,
        {code:"ajaxSend(0,['Liked',0]);"});
    // ajaxSend(0,['Liked',0]);
}
function ruminate(e){
    chrome.tabs.executeScript(null,
        {code:"ajaxSend(0, ['Ruminate',0]);"});
    // ajaxSend(0, ['Ruminate',0]);
}

document.addEventListener('DOMContentLoaded', function () {
//   var divs = document.querySelectorAll('div');
//   for (var i = 0; i < divs.length; i++) {
//     divs[i].addEventListener('click', click);
//   }
    document.getElementById('talk').addEventListener('click',talk);
    // var modify = document.getElementById('modify');
    // modify.addEventListener('click',modify);
    // var like = document.getElementById('like');
    // like.addEventListener('click',like);
    // var ruminate = document.getElementById('ruminate');
    // ruminate.addEventListener('click',ruminate);
});