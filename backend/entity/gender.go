package entity

import (
	"gorm.io/gorm"
)

type Gender struct {
	gorm.Model
	Gender string

	Customers []Customer `gorm:"foreignKey:GenderID"`
	Employees []Employee `gorm:"foreignKey:GenderID"`
}
