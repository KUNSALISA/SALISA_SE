package entity

import (
	"gorm.io/gorm"
)

type Customer struct {
	gorm.Model
	FirstName    string `gorm:"not null"`
	LastName     string `gorm:"not null"`
	Number       string `gorm:"not null"`
	Email        string `gorm:"uniqueIndex;not null"`
	Password     string `gorm:"not null"`
	Address      string `gorm:"not null"`
	CustomerType string `gorm:"not null"`
	Avatar       string `gorm:"type:longtext"`

	GenderID uint
	Gender   Gender `gorm:"foriegnKey:GenderID"`
}
