let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    const getUrl = "http://localhost:3000/EmployeePayrollDB/";
    makePromiseCall("GET", getUrl, true)
        .then(responseText => {
            console.log("Get User Data:" + responseText);
            empPayrollList = JSON.parse(responseText);
            document.querySelector(".emp-count").textContent = empPayrollList.length;
            createInnerHtml();
        })
        .catch(error => {
            console.log("Get error status:" + JSON.stringify(error));
        });
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
        <tr>
            <td><img class="profile" src="${empPayrollData._profile}" alt=""></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
                <img name="${empPayrollData.id}" onclick="remove(this)" 
                    src="../assets/icons/delete-black-18dp.svg" alt="delete">
                <img name="${empPayrollData.id}" onclick="update(this)"
                    src="../assets/icons/create-black-18dp.svg" alt="edit">
            </td> 
        </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

/**
 * function to get the department html
 */
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}

/**
 * Function to remove employee
 * @param {*} node 
 */
const remove = (node) => {
    const deleteUrl = `http://localhost:3000/EmployeePayrollDB/${node.name}`;
    //onreadystatechange is not called for synchronous request
    makePromiseCall("DELETE", deleteUrl, false)
        .then(responseText => {
            console.log("User Deleted:" + responseText);
        })
        .catch(error => {
            console.log("Delete error status:" + JSON.stringify(error));
        });
    document.querySelector('.emp-count').textContent = empPayrollList.length;
    createInnerHtml();
}

/**
 * Function to edit employee
 * @param {*} node 
 */
const update = (node) => {
    location.href = `../pages/empPayrollForm.html?id=${node.name}`;
}