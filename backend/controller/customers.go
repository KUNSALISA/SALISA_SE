package controller

import (
	"net/http"
	"strconv"

	"github.com/KUNSALISA/SALISA_SE/config"
	"github.com/KUNSALISA/SALISA_SE/entity"
	"github.com/gin-gonic/gin"
)

func CreateCustomer(c *gin.Context) {
	var customer entity.Customer

	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db := config.DB()

	var gender entity.Genders
	db.First(&gender, customer.GenderID)
	if gender.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}

	hashedPassword, _ := config.HashPassword(customer.Password)

	cust := entity.Customer{
		FirstName: customer.FirstName,
		LastName:  customer.LastName,
		Avatar:    customer.Avatar,
		Number:    customer.Number,
		Email:     customer.Email,
		Password:  hashedPassword,
		Address:   customer.Address,
		GenderID:  customer.GenderID,
		Gender:    gender,
	}
	if err := db.Create(&cust).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": cust})
}

func GetListCustomers(c *gin.Context) {

	var customer []entity.Customer
	db := config.DB()

	results := db.Preload("Gender").Find(&customer)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, customer)

}

func GetCustomers(c *gin.Context) {

	ID := c.Param("id")

	var customer entity.Customer
	db := config.DB()

	results := db.Preload("Gender").First(&customer, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if customer.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, customer)

}

func UpdateCustomers(c *gin.Context) {
	ID := c.Param("id")
	customerID, err := strconv.Atoi(ID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	db := config.DB()
	var existingCustomer entity.Customer

	// Find the existing customer
	if err := db.First(&existingCustomer, customerID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}

	var input entity.Customer
	// Bind JSON payload to struct
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input data"})
		return
	}

	// Update the existing customer fields
	existingCustomer.FirstName = input.FirstName
	existingCustomer.LastName = input.LastName
	existingCustomer.Email = input.Email
	existingCustomer.Number = input.Number
	existingCustomer.GenderID = input.GenderID
	existingCustomer.Address = input.Address
	existingCustomer.Avatar = input.Avatar // Ensure Avatar URL is stored

	// Save updated customer in the database
	if err := db.Save(&existingCustomer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update customer"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Customer updated successfully", "data": existingCustomer})
}

func DeleteCustomers(c *gin.Context) {
    ID := c.Param("id")

    db := config.DB()
    var customer entity.Customer

    // ตรวจสอบว่าลูกค้ามีอยู่ในระบบหรือไม่
    result := db.Preload("Gender").First(&customer, ID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
        return
    }
    // ลบข้อมูลลูกค้า
    if tx := db.Delete(&customer); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to delete customer"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}

