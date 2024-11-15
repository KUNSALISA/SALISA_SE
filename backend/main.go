// package main

// import (
// 	_ "net/http"

// 	_ "github.com/KUNSALISA/SALISA_SE/config"
// 	_ "github.com/KUNSALISA/SALISA_SE/controller"
// 	"github.com/gin-gonic/gin"
// )

// const PORT = "8080"

// func main() {

// 	// // open connection database
// 	// config.ConnectionDB()

// 	// // Generate databases
// 	// config.SetupDatabase()

// 	// r := gin.Default()

// 	// r.Use(CORSMiddleware())

// 	// router := r.Group("")
// 	// {

// 	// 	// User Routes
// 	// 	router.GET("/users", controller.ListUsers)
// 	// 	router.GET("/user/:id", controller.GetUser)
// 	// 	router.POST("/users", controller.CreateUser)
// 	// 	router.PATCH("/users", controller.UpdateUser)
// 	// 	router.DELETE("/users/:id", controller.DeleteUser)
// 	// 	// Gender Routes
// 	// 	router.GET("/genders", controller.ListGenders)
// 	// }

// 	// r.GET("/", func(c *gin.Context) {
// 	// 	c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
// 	// })

// 	// // Run the server

// 	// r.Run("localhost:" + PORT)

// }

// func CORSMiddleware() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
// 		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
// 		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
// 		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

// 		if c.Request.Method == "OPTIONS" {
// 			c.AbortWithStatus(204)
// 			return
// 		}

// 		c.Next()
// 	}
// }

package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Models
type Employee struct {
	gorm.Model
	E_FirstName string    `gorm:"not null"`
	E_LastName  string    `gorm:"not null"`
	Email       string    `gorm:"uniqueIndex;not null"`
	Password    string    `gorm:"not null"`
	StartDate   time.Time `gorm:"not null"`
	PositionID  uint
	Position    Position `gorm:"foreignKey:PositionID"`
}

type Position struct {
	gorm.Model
	Position  string
	Employees []Employee `gorm:"foreignKey:PositionID"`
}

// Database variable
var db *gorm.DB

// Seeder function
func seedDatabase() {
	positions := []Position{
		{Position: "Admin"},
		{Position: "Manager"},
		{Position: "Staff"},
		{Position: "Warehouse"},
	}

	for _, pos := range positions {
		db.FirstOrCreate(&pos, pos)
	}

	employees := []Employee{
		{E_FirstName: "Alice", E_LastName: "Admin", Email: "admin@example.com", Password: "admin123", PositionID: 1, StartDate: time.Now()},
		{E_FirstName: "Bob", E_LastName: "Manager", Email: "manager@example.com", Password: "manager123", PositionID: 2, StartDate: time.Now()},
		{E_FirstName: "Charlie", E_LastName: "Staff", Email: "staff@example.com", Password: "staff123", PositionID: 3, StartDate: time.Now()},
		{E_FirstName: "David", E_LastName: "Warehouse", Email: "warehouse@example.com", Password: "warehouse123", PositionID: 4, StartDate: time.Now()},
	}

	for _, emp := range employees {
		db.FirstOrCreate(&emp, emp)
	}
}

// Handlers
func loginHandler(c *gin.Context) {
	type LoginRequest struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user Employee
	if err := db.Where("email = ? AND password = ?", req.Email, req.Password).Preload("Position").First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Mock token generation (replace with real JWT in production)
	token := "mocked-token-for-" + user.Email

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"role":  user.Position.Position,
	})
}

// Main function
func main() {
	var err error
	db, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Migrate the schema
	db.AutoMigrate(&Employee{}, &Position{})

	// Seed database
	seedDatabase()
	
	// Setup Gin router
	r := gin.Default()
	r.Use(CORSMiddleware())

	// Routes
	r.POST("/login", loginHandler)

	// Start server
	log.Println("Server is running on http://localhost:8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}