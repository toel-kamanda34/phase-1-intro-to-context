// Function to create employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour: Number(payPerHour),
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Function for TimeIn events
function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date
    });
    return employee;
}

// Function for TimeOut events
function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date
    });
    return employee;
}

// Function to calculate hours worked on a date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(e => e.date === date);
    const timeOut = employee.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate all wages for an employee
function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(e => e.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
}

// Function to calculate total payroll
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}