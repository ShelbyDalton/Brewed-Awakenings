import { getEmployees, getOrders } from "./database.js"

const employees = getEmployees()

export const Employees = () => {
    let html = "<ul>"

    for (const employee of employees) {
        html += `<li id="employee--${employee.id}">${employee.name}</li>`
    }

    html += "</ul>"

    return html
}


// Declare a variable for our 'getOrders' function from the database. 
const orders = getOrders()
// Create a function that will calculate the number of sales for each employee. 
const employeeSales = (orders, employee) => {
    let totalSales = 0; // Employee sales start at 0. 
    for (let order of orders) {
        if (order.employeeId === employee.id) { // Orders that contain the employee's id will 
            totalSales ++
        }
    }
    return totalSales
}


document.addEventListener("click", (clickEvent) => {
    const itemClicked = clickEvent.target
    if (itemClicked.id.startsWith("employee")) {
        const [, employeeId] = itemClicked.id.split("--")
        for (const employee of employees) {
            if (employee.id === parseInt(employeeId)) {
                let sales = employeeSales(orders, employee)
                window.alert(`${employee.name} sold ${sales} products`)
            }
        }
    }
})