package controller

import (
	"net/http"

	"github.com/KUNSALISA/SALISA_SE/config"
	"github.com/KUNSALISA/SALISA_SE/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// type (
// 	signUp struct {
// 		E_FirstName string
// 		E_LastName  string
// 		Avatar      string
// 		Number      string
// 		Email       string
// 		Password    string
// 		Address     string
// 		StartDate   time.Time
// 		AccessLevel string

// 		GenderID    uint
// 		PositionID  uint
// 		WarehouseID uint
// 	}
// )

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

	id := c.Param("id")
	db := config.DB()
	// Find existing employee
	var employee entity.Employee
	if err := db.First(&employee, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Employee not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Bind JSON input to Employee struct
	var input entity.Employee
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update employee fields
	employee.E_FirstName = input.E_FirstName
	employee.E_LastName = input.E_LastName
	employee.Avatar = input.Avatar
	employee.Number = input.Number
	employee.Email = input.Email
	employee.Address = input.Address
	employee.AccessLevel = input.AccessLevel
	employee.GenderID = input.GenderID
	employee.PositionID = input.PositionID
	employee.WarehouseID = input.WarehouseID

	// Save changes to database
	if err := db.Save(&employee).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update employee"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Employee updated successfully", "employee": employee})
}

// func UpdateEmployees(c *gin.Context) {

// 	ID := c.Param("id")

// 	var employees entity.Employee
// 	db := config.DB()

// 	result := db.First(&employees, ID)
// 	if result.Error != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
// 		return
// 	}
// 	if err := c.ShouldBindJSON(&employees); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
// 		return
// 	}

// 	result = db.Save(&employees)
// 	if result.Error != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})

// }
func DeleteEmployees(c *gin.Context) {

	// Retrieve employee ID from URL parameter
	id := c.Param("id")
	db := config.DB()
	// Find existing employee
	var employee entity.Employee
	if err := db.First(&employee, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Employee not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Delete employee from database
	if err := db.Delete(&employee).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete employee"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Employee deleted successfully"})
}

// func DeleteEmployees(c *gin.Context) {

// 	ID := c.Param("id")

// 	db := config.DB()
// 	if tx := db.Exec("DELETE FROM Employee WHERE id = ?", ID); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

// }

// func SignUpEmployees(c *gin.Context) {
// 	var payload signUp

// 	if err := c.ShouldBindJSON(&payload); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	db := config.DB()

// 	// Check if the email is already registered
// 	var userCheck entity.Employee
// 	result := db.Where("email = ?", payload.Email).First(&userCheck)
// 	if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
// 		return
// 	}
// 	if userCheck.ID != 0 {
// 		c.JSON(http.StatusConflict, gin.H{"error": "Email is already registered"})
// 		return
// 	}

// 	// Handle avatar image upload if it's present
// 	var avatarURL string
// 	if file, err := c.FormFile("avatar"); err == nil { // Check for avatar file in request
// 		uploadPath := "./uploads/avatars/"
// 		if err := os.MkdirAll(uploadPath, os.ModePerm); err != nil {
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
// 			return
// 		}
// 		filePath := filepath.Join(uploadPath, file.Filename)
// 		if err := c.SaveUploadedFile(file, filePath); err != nil {
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save avatar file"})
// 			return
// 		}
// 		avatarURL = "/uploads/avatars/" + file.Filename
// 	}

// 	hashedPassword, _ := config.HashPassword(payload.Password)

// 	users := entity.Employee{
// 		E_FirstName: payload.E_FirstName,
// 		E_LastName:  payload.E_LastName,
// 		Avatar:      avatarURL, // Assign uploaded avatar URL
// 		Number:      payload.Number,
// 		Email:       payload.Email,
// 		Password:    hashedPassword,
// 		Address:     payload.Address,
// 		StartDate:   payload.StartDate,
// 		AccessLevel: payload.AccessLevel,
// 		GenderID:    payload.GenderID,
// 		PositionID:  payload.PositionID,
// 		WarehouseID: payload.WarehouseID,
// 	}

// 	if err := db.Create(&users).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusCreated, gin.H{"message": "Sign-up successful"})
// }

func SignUpEmployees(c *gin.Context) {
	var employee entity.Employee

	// Bind JSON input to the Employee struct
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db := config.DB()

	// Validate Gender
	var gender entity.Genders
	db.First(&gender, employee.GenderID)
	if gender.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}

	// Validate Position
	var position entity.Positions
	db.First(&position, employee.PositionID)
	if position.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "position not found"})
		return
	}

	// Validate Warehouse
	var warehouse entity.Warehouses
	db.First(&warehouse, employee.WarehouseID)
	if warehouse.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "warehouse not found"})
		return
	}

	// Hash the password
	hashedPassword, _ := config.HashPassword(employee.Password)

	// Create a new Employee instance
	emp := entity.Employee{
		E_FirstName: employee.E_FirstName,
		E_LastName:  employee.E_LastName,
		Avatar:      employee.Avatar,
		Number:      employee.Number,
		Email:       employee.Email,
		Password:    hashedPassword,
		Address:     employee.Address,
		StartDate:   employee.StartDate,
		AccessLevel: employee.AccessLevel,
		GenderID:    employee.GenderID,
		Gender:      gender,
		PositionID:  employee.PositionID,
		Position:    position,
		WarehouseID: employee.WarehouseID,
		Warehouse:   warehouse,
	}

	// Save the employee to the database
	if err := db.Create(&emp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Return a successful response
	c.JSON(http.StatusCreated, gin.H{"message": "Employee created successfully", "data": emp})
}
