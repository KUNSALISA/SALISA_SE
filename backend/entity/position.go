package entity

import (
	"gorm.io/gorm"
)

type Position struct {
	gorm.Model
	position_name string

	Employees []Employee `gorm:"foreignKey:PositionID"`
}
