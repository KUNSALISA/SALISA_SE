package unit

import (
	"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/KUNSALISA/SALISA_SE/entity"
)

func TestEmployeeValidation(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`First Name is required`, func(t *testing.T) {
		emp := entity.Employee{
			E_FirstName: "",
			E_LastName:  "Smith",
			Avatar:      "avatar_url",
			Number:      "1234567890",
			Email:       "test@example.com",
			Password:    "password123",
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "Admin",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(emp)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("First Name is required."))
	})

	t.Run(`Phone Number must be 10 digits`, func(t *testing.T) {
		emp := entity.Employee{
			E_FirstName: "John",
			E_LastName:  "Smith",
			Avatar:      "avatar_url",
			Number:      "12345", // Invalid length
			Email:       "test@example.com",
			Password:    "password123",
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "Admin",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(emp)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Phone Number length is not 10 digits."))
	})

	t.Run(`Email format validation`, func(t *testing.T) {
		emp := entity.Employee{
			E_FirstName: "John",
			E_LastName:  "Smith",
			Avatar:      "avatar_url",
			Number:      "1234567890",
			Email:       "invalid-email", // Invalid format
			Password:    "password123",
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "Admin",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(emp)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Invalid email format."))
	})
}

func TestCustomerValidation(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`First Name is required`, func(t *testing.T) {
		cust := entity.Customer{
			FirstName: "",
			LastName:  "Smith",
			Avatar:    "avatar_url",
			Number:    "1234567890",
			Email:     "test@example.com",
			Password:  "password123",
			Address:   "123 Main St",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(cust)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("First Name is required."))
	})

	t.Run(`Phone Number must be 10 digits`, func(t *testing.T) {
		cust := entity.Customer{
			FirstName: "John",
			LastName:  "Smith",
			Avatar:    "avatar_url",
			Number:    "12345", // Invalid length
			Email:     "test@example.com",
			Password:  "password123",
			Address:   "123 Main St",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(cust)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Phone Number length is not 10 digits."))
	})
}