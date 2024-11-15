package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/KUNSALISA/SALISA_SE/config"
	"github.com/KUNSALISA/SALISA_SE/entity"
)

// GET /genders
func ListGenders(c *gin.Context) {
	var genders []entity.Genders

	db := config.DB()
	db.Find(&genders)
	c.JSON(http.StatusOK, &genders)
}