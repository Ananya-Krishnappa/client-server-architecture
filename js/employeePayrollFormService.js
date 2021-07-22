/**
 * Function to save the employee details. It fetches the details from the form
 *  and stores in employeePayrollData object
 */
function save() {
    try {
        let postUrl = "http://localhost:3000/EmployeePayrollDB/";
        let methodType="POST";
        let empData = createEmployeePayroll();
        let id = extractIdFromUrl();
        if (id) {
            empData.id = id;
            postUrl = `http://localhost:3000/EmployeePayrollDB/${id}`;
            methodType="PUT";
        }
        makePromiseCall(methodType, postUrl, true, empData)
            .then(responseText => {
                console.log("New User Added:" + responseText);
                location.href = '../pages/homePage.html';
            })
            .catch(error => {
                console.log(`${methodType} error status:` + JSON.stringify(error));
            });
    } catch (e) {
        console.error(e);
    }
}

/**
 *  Function to add employee details to employee payroll object
 * @returns employeePayrollObject
 */
function createEmployeePayroll() {
    let employeePayrollData = new EmployeePayrollData();
    employeePayrollData._name = document.forms["form"]["name"].value;
    employeePayrollData._profile = document.forms["form"]["profile"].value;
    employeePayrollData._gender = document.forms["form"]["gender"].value;
    const checkboxes = document.querySelectorAll(`input[name="department"]:checked`);
    let department = [];
    checkboxes.forEach((checkbox) => {
        department.push(checkbox.value);
    });
    employeePayrollData._department = department;
    employeePayrollData._salary = document.forms["form"]["salary"].value;
    let day = document.forms["form"]["day"].value;
    let month = document.forms["form"]["month"].value;
    let year = document.forms["form"]["year"].value;
    let date = `${day} ${month} ${year}`;
    employeePayrollData._notes = document.forms["form"]["notes"].value;
    employeePayrollData._startDate = new Date(Date.parse(date));
    console.log(employeePayrollData.toString());
    return employeePayrollData;
}

/**
 * To set Event
Listeners when Document
is loaded so as to
- Set Event Listener on Salary Range to
display appropriate value
- Validation of Name and Date
 */
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output-text');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
})

/**
 * Ability to reset the form
on clicking reset
 */
const resetForm = () => {
    setValue('#name', '');
    unSetSelectedValues('[name=profile]');
    unSetSelectedValues('[name=gender]');
    unSetSelectedValues('[name=department]');
    setValue('#salary', '');
    setTextValue('#salaryOutput', '400000');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2020');
}

const unSetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}