package controller

import (
	"net/http"

	"github.com/KUNSALISA/SALISA_SE/config"
	"github.com/KUNSALISA/SALISA_SE/entity"
	"github.com/gin-gonic/gin"
)

func GetListWarehouses(c *gin.Context) {
	var warehouses []entity.Warehouses

	db := config.DB()
	db.Find(&warehouses)
	c.JSON(http.StatusOK, &warehouses)
}
