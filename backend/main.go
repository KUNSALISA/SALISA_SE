package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/KUNSALISA/SALISA_SE/config"
	"github.com/KUNSALISA/SALISA_SE/controller"
	"github.com/KUNSALISA/SALISA_SE/middleware"
)

const PORT = "8080"

func main() {

	config.ConnectionDB()
	config.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	// เสิร์ฟไฟล์ static สำหรับ avatar
	r.Static("/uploads", "../backend/uploads")

	// r.POST("/signup", controller.SignUpEmployees)
	r.POST("/signin", controller.SignInEmployees)

	router := r.Group("/")
	{
		router.Use(middleware.Authorizes())
		//Employee
		router.POST("/signup_employee", controller.SignUpEmployees)
		router.PUT("/user/:id", controller.UpdateEmployees)
		router.GET("/users", controller.GetListEmployees)
		router.GET("/user/:id", controller.GetEmployees)
		router.DELETE("/user/:id", controller.DeleteEmployees)
		//Customer
		router.POST("/customer", controller.CreateCustomer)
		router.PUT("/customer/:id", controller.UpdateCustomers)
		router.GET("/customers", controller.GetListCustomers)
		router.GET("/customer/:id", controller.GetCustomers)
		router.DELETE("/customer/:id", controller.DeleteCustomers)
		//Gender
		router.GET("/genders", controller.GetListGenders)
		//Position
		router.GET("/positions", controller.GetListPositions)
		//Warehouse
		router.GET("/warehouses", controller.GetListWarehouses)
	}

	r.GET("/", func(c *gin.Context) {

		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)

	})
	r.Run("localhost:" + PORT)

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
