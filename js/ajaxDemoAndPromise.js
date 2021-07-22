let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
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
            if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.responseText);
            } else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed");
            }
        }
    });
}
const getUrl = "http://localhost:3000/employees/1";
makePromiseCall("GET", getUrl, true)
    .then(responseText => {
        console.log("Get User Data:" + responseText);
    })
    .catch(error =>
        console.log("Get error status:" + JSON.stringify(error)));

const deleteUrl = "http://localhost:3000/employees/4";

//onreadystatechange is not called for synchronous request
makePromiseCall("DELETE", deleteUrl, false)
    .then(responseText => {
        console.log("User Deleted:" + responseText);
    })
    .catch(error =>
        console.log("Delete error status:" + JSON.stringify(error)));

const postUrl = "http://localhost:3000/employees";
const empData = {
    "name": "Harry",
    "salary": "5000"
};
makePromiseCall("POST", postUrl, true, empData)
    .then(responseText => {
        console.log("User Added:" + responseText);
    })
    .catch(error =>
        console.log("Post error status:" + JSON.stringify(error)));