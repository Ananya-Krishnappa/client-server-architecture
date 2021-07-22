window.addEventListener('DOMContentLoaded', (event) => {
    prePopulateForm();
});

/**
 * Function to populate employee
 */
const prePopulateForm = () => {
    let id = extractIdFromUrl();
    if (id) {
        const getUrl = `http://localhost:3000/EmployeePayrollDB/${id}`;
        makePromiseCall("GET", getUrl, true)
            .then(responseText => {
                console.log("Get User Data:" + responseText);
                let employee = JSON.parse(responseText);
                setForm(employee);
            })
            .catch(error => {
                console.log("Get error status:" + JSON.stringify(error));
            });
    }
}

/**
 * Function to set the form with employee details from local storage
 * @param {*} empPayroll 
 */
const setForm = (empPayroll) => {
    populateValue('#name', empPayroll._name);
    populateSelectedValues('[name=profile]', empPayroll._profile);
    populateSelectedValues('[name=gender]', empPayroll._gender);
    populateSelectedValues('[name=department]', empPayroll._department);
    populateValue('#salary', empPayroll._salary);
    populateTextValue('#salaryOutput', empPayroll._salary);
    populateValue('#notes', empPayroll._notes);
    const date = new Date(empPayroll._startDate);
    populateValue('#day', date.getDate());
    populateValue('#month', getMonth(date.getMonth()+1));
    populateValue('#year', date.getFullYear());
}

function getMonth(month) {
    var months = {
        1: "jan",
        2: "feb",
        3: "mar",
        4: "apr",
        5: "may",
        6: "jun",
        7: "jul",
        8: "aug",
        9: "sep",
        10: "oct",
        11: "nov",
        12: "dec"
    };
    return months[month];
}

const populateSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value == value) {
            item.checked = true;
        }
    });
}

const populateTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const populateValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}