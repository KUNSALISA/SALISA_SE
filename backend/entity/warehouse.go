package entity

import (
	"gorm.io/gorm"
)

type Warehouse struct {
	gorm.Model
	warehouse_name string

	Employees []Employee `gorm:"foreignKey:PositionID"`
}
