package controller

import (
	"net/http"

	"github.com/KUNSALISA/SALISA_SE/config"
	"github.com/KUNSALISA/SALISA_SE/entity"
	"github.com/gin-gonic/gin"
)

func GetListGenders(c *gin.Context) {
	var genders []entity.Genders

	db := config.DB()
	db.Find(&genders)
	c.JSON(http.StatusOK, &genders)
}
