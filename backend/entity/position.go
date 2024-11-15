package entity

import (
	"gorm.io/gorm"
)

type Position struct {
	gorm.Model
	Position string

	Employees []Employee `gorm:"foreignKey:PositionID"`
}
