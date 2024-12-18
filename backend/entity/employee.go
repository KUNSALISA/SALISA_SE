package entity

import (
	"time"

	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	E_FirstName string    `gorm:"not null"`
	E_LastName  string    `gorm:"not null"`
	Avatar      string    `gorm:"not null"`
	Number      string    `gorm:"not null"`
	Email       string    `gorm:"uniqueIndex;not null"`
	Password    string    `gorm:"not null"`
	Address     string    `gorm:"not null"`
	StartDate   time.Time `gorm:"not null"`
	AccessLevel string    `gorm:"not null"` /////////ต้องมีรวบเป็น position เลย

	GenderID    uint
	Gender      Genders `gorm:"foriegnKey:GenderID"`
	PositionID  uint
	Position    Positions `gorm:"foreignKey:PositionID"`
	WarehouseID uint
	Warehouse   Warehouses `gorm:"foreignKey:WarehouseID"`
}
