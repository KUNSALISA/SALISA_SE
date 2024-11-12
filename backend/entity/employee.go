package entity

import (
	"time"

	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	FirstName   string    `gorm:"not null"`
	LastName    string    `gorm:"not null"`
	Number      string    `gorm:"not null"`
	Email       string    `gorm:"uniqueIndex;not null"`
	Password    string    `gorm:"not null"`
	Address     string    `gorm:"not null"`
	StartDate   time.Time `gorm:"not null"`
	AccessLevel string    `gorm:"not null"`
	Profile_E   string    `gorm:"type:longtext"`

	GenderID    uint
	Gender      Gender `gorm:"foriegnKey:GenderID"`
	PositionID  uint
	Position    Position `gorm:"foreignKey:PositionID"`
	WarehouseID uint
	Warehouse   Warehouse `gorm:"foreignKey:WarehouseID"`
}
