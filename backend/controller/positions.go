package controller

import (
	"net/http"

	"github.com/KUNSALISA/SALISA_SE/config"
	"github.com/KUNSALISA/SALISA_SE/entity"
	"github.com/gin-gonic/gin"
)

func GetListPositions(c *gin.Context) {
	var positions []entity.Positions

	db := config.DB()
	db.Find(&positions)
	c.JSON(http.StatusOK, &positions)
}
