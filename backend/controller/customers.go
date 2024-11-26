package controller

import (
	"net/http"

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
		Avatar:   customer.Avatar, 
		Number:   customer.Number, 
		Email:     customer.Email,  
		Password:  hashedPassword,
		Address:  customer.Address,
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

	var customer entity.Customer
	db := config.DB()

	result := db.First(&customer, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&customer)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})

}

func DeleteCustomers(c *gin.Context) {

	ID := c.Param("id")

	db := config.DB()
	if tx := db.Exec("DELETE FROM Customer WHERE id = ?", ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}
