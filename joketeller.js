// joketeller.js

// Add const to handle HTML Elements:
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK
const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};

// This is function to test Text to Speech API calls
// function test() {
//     VoiceRSS.speech({
//         key: '49ef90548459472c9461d00fd274f38e',
//         src: 'Hello, world!',
//         hl: 'en-us',
//         r: 0, 
//         c: 'mp3',
//         f: '44khz_16bit_stereo',
//         ssml: false
// });
// }

// test();

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  //console.log('tell me:', joke);
  VoiceRSS.speech({
    key: '49ef90548459472c9461d00fd274f38e',
    src: joke,
    hl: 'en-us',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
});
}

// Get Jokes from Joke API
// Use this vs promise 
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming';

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
    //   check if joke is single or twopart; format accordingly
      if (data.setup) {
        // twopart format - use backtics for variables embedded in strings
        joke = `${data.setup} ... ${data.delivery}`;
      } else {
        // single format
          joke = data.joke;
      }
      // Pass joke to VoiceRSS API via function tellMe()
      tellMe(joke);
      //console.log(joke);
      //console.log(data);
      //console.log(data.joke);
    
      //console.log(await response.text());
    } catch (error) {
        // Catch Errors here
        console.log('fetch failed', error);
    }
}
  
getJokes();