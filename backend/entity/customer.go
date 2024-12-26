package entity

import (
	"gorm.io/gorm"
)

type Customer struct {
	gorm.Model
	FirstName string `gorm:"not null" valid:"required~First Name is required.,alpha~First Name must contain only letters."`
	LastName  string `gorm:"not null" valid:"required~Last Name is required.,alpha~Last Name must contain only letters."`
	Avatar    string `gorm:"type:longtext" valid:"required~Avatar is required."`
	Number    string `gorm:"uniqueIndex" valid:"required~Phone Number is required.,stringlength(10|10)~Phone Number length is not 10 digits."`
	Email     string `gorm:"uniqueIndex" valid:"required~Email is required.,email~Invalid email format."`
	Password  string `gorm:"not null" valid:"required~Password is required.,stringlength(8|100)~Password must be at least 8 characters."`
	Address   string `gorm:"not null" valid:"required~Address is required."`

	GenderID uint    `valid:"required~Gender is required"`
	Gender   Genders `gorm:"foriegnKey:GenderID"`
}
