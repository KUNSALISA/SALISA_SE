package config

import (
	_ "fmt"
	_ "time"

	_ "github.com/KUNSALISA/SALISA_SE/entity"
	_ "gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}
