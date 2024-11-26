import { EmployeeInterface, CustomerInterface, GendersInterface, PositionsInterface, WarehousesInterface } from "../../interfaces/InterfaceFull";
import { SignInInterface } from "../../interfaces/SignIn";
import axios from "axios";

//EmployeeInterface, CustomerInterface, GendersInterface, PositionsInterface, WarehousesInterface

const apiUrl = "http://localhost:8080";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");


const requestOptions = {

  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },

};


async function SignIn(data: SignInInterface) {

  return await axios

    .post(`${apiUrl}/signin`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function GetGender() {

  return await axios

    .get(`${apiUrl}/genders`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}

async function GetPositions() {

  return await axios

    .get(`${apiUrl}/positions`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}

async function GetWarehouses() {

  return await axios

    .get(`${apiUrl}/warehouses`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function GetAllEmployees() {

  return await axios

    .get(`${apiUrl}/users`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function GetEmployeesById(id: string) {

  return await axios

    .get(`${apiUrl}/user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function UpdateEmployeeById(id: string, data: EmployeeInterface) {

  return await axios

    .put(`${apiUrl}/user/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function DeleteEmployeeById(id: string) {

  return await axios

    .delete(`${apiUrl}/user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function CreateEmployee(data: EmployeeInterface) {

  return await axios

    .post(`${apiUrl}/signup_employee`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}

async function CreateCustomer(data: CustomerInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/customer`, requestOptions)
    .then((res) => {
      if (res.status == 201) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function GetAllCustomers() {

  return await axios

    .get(`${apiUrl}/customers`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function GetCustomersById(id: string) {

  return await axios

    .get(`${apiUrl}/customer/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function UpdateCustomersById(id: string, data: EmployeeInterface) {

  return await axios

    .put(`${apiUrl}/customer/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


async function DeleteCustomersById(id: string) {

  return await axios

    .delete(`${apiUrl}/customer/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);

}


export {

  SignIn,
  GetGender,
  GetPositions,
  GetWarehouses,
  GetAllEmployees,
  GetEmployeesById,
  UpdateEmployeeById,
  DeleteEmployeeById,
  CreateEmployee,
  CreateCustomer,
  GetAllCustomers,
  GetCustomersById,
  UpdateCustomersById,
  DeleteCustomersById,

};

