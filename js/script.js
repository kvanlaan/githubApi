console.log("hello baby")



//define the variables
var baseUrl = "https://api.github.com/users/"
var userName = "kvanlaan"
var apiKey = "?access_token=6c76a4cb4e123d0e659eb22700fd7a2d332c7a3f"
var userUrl = baseUrl + userName + apiKey

var reposUrl = baseUrl + userName + "/repos" + apiKey


//queryselectors, set up the elements 
var leftColumn = document.getElementById("leftColumn")
var repoContainer = document.getElementById("repoContainer")
var inputEl = document.querySelector("input")


//functions in alphabetical order!!!
//controller function

var controller = function() {
	var query = location.hash.substr(1)
	doRequest(query) 
}

///

var doRequest = function(query) {
	var userUrl = baseUrl + query + apiKey
	var promiseUser = $.getJSON(userUrl)
	var reposUrl = baseUrl + userName + "/repos" + apiKey
	var promiseRepo = $.getJSON(reposUrl)

	promiseUser.then(showUserData)
	promiseRepo.then(showRepoData) 
}

///activate the search funciton
var handleUserInput = function(keyEvent) {
	var inputEl = document.querySelector("input")
		
	if (keyEvent.keyCode === 13) {
		var inputEl = keyEvent.target
		var query = inputEl.value
		location.hash = query
		inputEl.value = ""
	}
}




var repoDataToHtml = function(jsonRepoData) {
    var repoName = repoObj.name
    var newRepoHTMLstring = ''
    newRepoHTMLstring += '<ul class="repo"><p class="repoName">' + repoName + '</p></ul>'
    return newRepoHTMLstring 
}


var showRepoData = function(jsonRepoData) {

    var newRepoHTMLstring = ""
    var repoArray = jsonRepoData

    for (var i = 0; i < repoArray.length; i++) {
        repoObj = repoArray[i]
        newRepoHTMLstring += repoDataToHtml(repoObj)
        repoContainer.innerHTML = newRepoHTMLstring
    }
}



var showUserData = function(jsonUserData) {

	
var followers = jsonUserData.followers
var dateCreated = jsonUserData.created_at
var following = jsonUserData.following
var userImg = jsonUserData.avatar_url
var name = jsonUserData.name
var location = jsonUserData.location
	
var newUserHtmlString = ""
	
	newUserHtmlString+= '<img class="userImg" src="' + userImg + '">'
	newUserHtmlString+='<p class="name">' + name + '</p>' 
	newUserHtmlString+='<ul><li class = "li">' + location + '</li></ul>'
	newUserHtmlString+='<li class = "li">' + dateCreated + '</li>'
	newUserHtmlString+='<div class="following"><p>' + followers + '</p><p> Followers </p></div>'
	newUserHtmlString+='<div class="following"><p>0</p>' + "<p> Starred </p>" + '</div>'
	newUserHtmlString+='<div class="following"><p>' + following + '</p>' + "<p> Following </p>" + '</div>'

	leftColumn.innerHTML = newUserHtmlString
}


inputEl.addEventListener("keydown",handleUserInput)

 ///give power to the controller
window.addEventListener("hashchange",controller)

//initial request
doRequest("kvanlaan")
