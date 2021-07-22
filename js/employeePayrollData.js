/**
 * Purpose:Employee Payroll App
 * @author Ananya K
 * @version 1.0
 * @since 22/07/2021
 * 
 */
class EmployeePayrollData {
    id;
    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        } else {
            throw "name is incorrect";
        }
    }

    get profile() {
        return this._profile;
    }
    set profile(profile) {
        this._profile = profile;
    }

    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }
    get notes() {
        return this._notes;
    }
    set notes(notes) {
        this._notes = notes;
    }

    get salary() {
        return this._salary;
    }
    set salary(salary) {
        let sRegex = RegExp("^[1-9]{1}[0-9]*$");
        if (sRegex.test(salary)) {
            this._salary = salary;
        } else {
            throw "Invalid salary";
        }
    }

    get gender() {
        return this._gender;
    }
    set gender(gender) {
        let gRegex = RegExp("^[MF]$");
        if (gRegex.test(gender)) {
            this._gender = gender;
        } else {
            throw "Invalid gender";
        }
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        let date = new Date();
        if (startDate <= date) {
            this._startDate = startDate;
        } else {
            throw "Invalid Date";
        }
    }

    toString() {
        return (
            "id=" + this.id +
            ", name=" + this.name +
            ", profile=" + this.profile +
            ", salary=" + this.salary +
            ", department=" + this.department +
            ", notes=" + this.notes +
            ", gender: " + this.gender +
            ", startDate: " + this.startDate
        );
    }
}