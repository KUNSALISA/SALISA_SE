package entity

import (
	"gorm.io/gorm"
)

type Gender struct {
	gorm.Model
	gender_name string

	Customers []Customer `gorm:"foreignKey:GenderID"`
	Employees []Employee `gorm:"foreignKey:GenderID"`
}
