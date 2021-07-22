let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.open(methodType, url, async);
    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
        console.log(methodType + " request sent to the server");
    }
    xhr.onreadystatechange = function () {
        console.log("State changed called.Ready state: " + xhr.readyState + " Status " + xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 client error or 500 server error");
            }
        }
    }
}

const getUrl = "http://localhost:3000/employees/1";

function getUserDetails(data) {
    console.log("Get User Data:" + data);
}
makeAJAXCall("GET", getUrl, getUserDetails);

const deleteUrl = "http://localhost:3000/employees/4";

function userDeleted(data) {
    console.log("User Deleted:" + data);
}
//Note:callback function is not called for synchronous request
makeAJAXCall("DELETE", deleteUrl, userDeleted, false);

const postUrl = "http://localhost:3000/employees";
const empData = {
    "name": "Harry",
    "salary": "5000"
};

function userAdded(data) {
    console.log("User Added:" + data);
}
makeAJAXCall("POST", postUrl, userAdded, true, empData);