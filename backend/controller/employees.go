package controller

import (
	"net/http"
	"os"
	"path/filepath"

	"github.com/KUNSALISA/SALISA_SE/config"
	"github.com/KUNSALISA/SALISA_SE/entity"
	"github.com/gin-gonic/gin"

	"errors"

	"time"

	"gorm.io/gorm"
)

type (
	signUp struct {
		E_FirstName string
		E_LastName  string
		Avatar      string
		Number      string
		Email       string
		Password    string
		Address     string
		StartDate   time.Time
		AccessLevel string

		GenderID    uint
		PositionID  uint
		WarehouseID uint
	}
)

func GetListEmployees(c *gin.Context) {

	var employees []entity.Employee
	db := config.DB()

	results := db.Preload("Gender").Preload("Position").Preload("Warehouse").Find(&employees)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, employees)

}

func GetEmployees(c *gin.Context) {

	ID := c.Param("id")

	var employees entity.Employee
	db := config.DB()

	results := db.Preload("Gender").Preload("Positions").Preload("Warehouse").First(&employees, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if employees.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, employees)

}

func UpdateEmployees(c *gin.Context) {

	ID := c.Param("id")

	var employees entity.Employee
	db := config.DB()

	result := db.First(&employees, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&employees); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&employees)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})

}

func DeleteEmployees(c *gin.Context) {

	ID := c.Param("id")

	db := config.DB()
	if tx := db.Exec("DELETE FROM Employee WHERE id = ?", ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

func SignUpEmployees(c *gin.Context) {
	var payload signUp

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db := config.DB()

	// Check if the email is already registered
	var userCheck entity.Employee
	result := db.Where("email = ?", payload.Email).First(&userCheck)
	if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	if userCheck.ID != 0 {
		c.JSON(http.StatusConflict, gin.H{"error": "Email is already registered"})
		return
	}

	// Handle avatar image upload if it's present
	var avatarURL string
	if file, err := c.FormFile("avatar"); err == nil { // Check for avatar file in request
		uploadPath := "./uploads/avatars/"
		if err := os.MkdirAll(uploadPath, os.ModePerm); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
			return
		}
		filePath := filepath.Join(uploadPath, file.Filename)
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save avatar file"})
			return
		}
		avatarURL = "/uploads/avatars/" + file.Filename
	}

	hashedPassword, _ := config.HashPassword(payload.Password)

	users := entity.Employee{
		E_FirstName: payload.E_FirstName,
		E_LastName:  payload.E_LastName,
		Avatar:      avatarURL, // Assign uploaded avatar URL
		Number:      payload.Number,
		Email:       payload.Email,
		Password:    hashedPassword,
		Address:     payload.Address,
		StartDate:   payload.StartDate,
		AccessLevel: payload.AccessLevel,
		GenderID:    payload.GenderID,
		PositionID:  payload.PositionID,
		WarehouseID: payload.WarehouseID,
	}

	if err := db.Create(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Sign-up successful"})
}
