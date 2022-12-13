function createEmployeeRecord(employeeRecord){
    return {
        firstName: employeeRecord[0],
        familyName: employeeRecord[1],
        title: employeeRecord[2],
        payPerHour: employeeRecord[3],
        timeInEvents:[],
        timeOutEvents:[]
        
        
    }
}

function createEmployeeRecords(employeesArray){
    const employeesRecords = []
employeesArray.map(employeeArray =>{

const employeeRecord = (createEmployeeRecord(employeeArray))
 employeesRecords.push(employeeRecord)


})
return employeesRecords
}

function createTimeInEvent(employeeRecord, timeInStamp){
   const time = timeInStamp.split(" ")
   const date = time[0]
   const hour = parseInt(time[1])
   employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: hour,
    date: date
   })

   return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeOutStamp){
   const time = timeOutStamp.split(" ")
   const date = time[0]
   const hour = parseInt(time[1])
   employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: hour,
    date: date
   })

   return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    const timeIn = employeeRecord.timeInEvents.find(function (e) {
      return e.date === date;
    });
    const timeOut = employeeRecord.timeOutEvents.find(function (e) {
      return e.date === date;
    });
    return (timeOut.hour - timeIn.hour) / 100;
}


function wagesEarnedOnDate(employeeRecord, date){
  const Wage = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
  return Wage;
}

// function allWagesFor(employeeRecord){
//     let wagesEarnedAlldays = []
//     daysworked.map(day =>{
//        const hourIn = createTimeInEvent(employeeRecord, day.timeIn).timeInEvents[0].hour
//        const hourOut = createTimeOutEvent(employeeRecord, day.timeOut).timeOutEvents[0].hour

//        const wagesEarnedperday =((hourOut - hourIn)/100) * employeeRecord.payPerHour
//        wagesEarnedAlldays.push(wagesEarnedperday)

//     })
//    const totalWagesEarned = wagesEarnedAlldays.reduce((a,b)=>a+b, 0)

//    return totalWagesEarned
// }
function allWagesFor(employeeRecord) {
  const eligibleDates = employeeRecord.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate(employeeRecord, d);
    },
    0
  ); 

  return payable;
};

  function calculatePayroll(employeesRecords){
    return employeesRecords.reduce(function (memo, rec) {
      return memo + allWagesFor(rec);
    }, 0);
  }