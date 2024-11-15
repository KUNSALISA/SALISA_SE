package entity

import (
	"gorm.io/gorm"
)

type Warehouse struct {
	gorm.Model
	Warehouse_name string

	Employees []Employee `gorm:"foreignKey:PositionID"`
}
