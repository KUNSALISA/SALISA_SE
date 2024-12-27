package unit

import (
	"fmt"
	"testing"
	"time"

	"github.com/KUNSALISA/SALISA_SE/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// Employee
func TestEmployeeFirstName(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`First Name is required`, func(t *testing.T) {
		employee := entity.Employee{
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

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("First Name is required."))
	})

	t.Run(`First Name must contain only letters`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "John123", // Invalid First Name
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

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("First Name must contain only letters."))
	})
}

func TestEmployeeLastName(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Last Name is required`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "", // Last Name is required
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

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Last Name is required."))
	})

	t.Run(`Last Name must contain only letters`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith123", // Invalid Last Name
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

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Last Name must contain only letters."))
	})
}

func TestEmployeeAvatar(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Avatar is required`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith",
			Avatar:      "", // Avatar is required
			Number:      "0843848904",
			Email:       "test@example.com",
			Password:    "password123",
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "Admin",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Avatar is required."))
	})
}

func TestEmployeeNumber(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Phone Number is required`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith",
			Avatar:      "https://example.com/avatar.jpg",
			Number:      "", // Phone Number is required
			Email:       "test@example.com",
			Password:    "password123",
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "Admin",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Phone Number is required."))
	})

	t.Run(`Phone Number length is 10 digits`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith",
			Avatar:      "https://example.com/avatar.jpg",
			Number:      "084", // Invalid Phone Number length
			Email:       "test@example.com",
			Password:    "password123",
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "Admin",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal(fmt.Sprintf("Phone Number length is not 10 digits.")))
	})
}

func TestEmployeeEmail(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Email is required`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith",
			Avatar:      "https://example.com/avatar.jpg",
			Number:      "0918543621",
			Email:       "", // Email is required
			Password:    "12345678",
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "Admin",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Email is required."))
	})

	t.Run(`Invalid email format`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith",
			Avatar:      "https://example.com/avatar.jpg",
			Number:      "0843848562",
			Email:       "invalid-email", // Invalid email format
			Password:    "12345678",
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "Admin",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Invalid email format."))
	})
}

func TestEmployeePassword(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Password is required`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith",
			Avatar:      "https://example.com/avatar.jpg",
			Number:      "0843848562",
			Email:       "test@example.com",
			Password:    "", // Password is required
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "Admin",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Password is required."))
	})

	t.Run(`Password must be at least 8 characters`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith",
			Avatar:      "https://example.com/avatar.jpg",
			Number:      "0843848562",
			Email:       "test@example.com",
			Password:    "12345", // Password is too short
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "Admin",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Password must be at least 8 characters."))
	})
}

func TestEmployeeAddress(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Address is required`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith",
			Avatar:      "https://example.com/avatar.jpg",
			Number:      "0843848562",
			Email:       "test@example.com",
			Password:    "123456789",
			Address:     "", // Address is required
			StartDate:   time.Now(),
			AccessLevel: "admin",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Address is required."))
	})
}

func TestEmployeeStartDate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Start date is required`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith",
			Avatar:      "https://example.com/avatar.jpg",
			Number:      "0843848562",
			Email:       "test@example.com",
			Password:    "123456789",
			Address:     "123 Main St",
			StartDate:   time.Time{}, // StartDate is required
			AccessLevel: "admin",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Start date is required."))
	})
}

func TestEmployeeAccessLevel(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Access level is required`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith",
			Avatar:      "https://example.com/avatar.jpg",
			Number:      "0843848562",
			Email:       "test@example.com",
			Password:    "123456789",
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "", // AccessLevel is required
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Access level is required."))
	})
}

func TestEmployeeGender(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Gender is required`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith",
			Avatar:      "https://example.com/avatar.jpg",
			Number:      "0843848562",
			Email:       "test@example.com",
			Password:    "123456789",
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "Manager",
			GenderID:    0, // Gender is required
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Gender is required"))
	})
}

func TestEmployeePosition(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Position is required`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith",
			Avatar:      "https://example.com/avatar.jpg",
			Number:      "0843848562",
			Email:       "test@example.com",
			Password:    "123456789",
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "Manager",
			GenderID:    1,
			PositionID:  0, // Position is required
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Position is required"))
	})
}

func TestEmployeeWarehouse(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Warehouse is required`, func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "Johnny",
			E_LastName:  "Smith",
			Avatar:      "https://example.com/avatar.jpg",
			Number:      "0843848562",
			Email:       "test@example.com",
			Password:    "123456789",
			Address:     "123 Main St",
			StartDate:   time.Now(),
			AccessLevel: "Manager",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 0, // Warehouse is required
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Warehouse is required"))
	})
}

func TestAllEmployee(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("All correct", func(t *testing.T) {
		employee := entity.Employee{
			E_FirstName: "John",
			E_LastName:  "Doe",
			Avatar:      "https://example.com/avatar.png",
			Number:      "0123456789",
			Email:       "john.doe@example.com",
			Password:    "securepassword123",
			Address:     "123 Main St, Springfield",
			StartDate:   time.Now(),
			AccessLevel: "Admin",
			GenderID:    1,
			PositionID:  1,
			WarehouseID: 1,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}

//Customer

func TestCustomerFirstName(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`First Name is required`, func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "",
			LastName:  "Smith",
			Avatar:    "avatar_url",
			Number:    "1234567890",
			Email:     "test@example.com",
			Password:  "password123",
			Address:   "123 Main St",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("First Name is required."))
	})

	t.Run(`First Name must contain only letters`, func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "John123", // Invalid First Name
			LastName:  "Smith",
			Avatar:    "avatar_url",
			Number:    "1234567890",
			Email:     "test@example.com",
			Password:  "password123",
			Address:   "123 Main St",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("First Name must contain only letters."))
	})
}

func TestCustomerLastName(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Last Name is required`, func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "Johnny",
			LastName:  "", // Last Name is required
			Avatar:    "avatar_url",
			Number:    "1234567890",
			Email:     "test@example.com",
			Password:  "password123",
			Address:   "123 Main St",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Last Name is required."))
	})

	t.Run(`Last Name must contain only letters`, func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "Johnny",
			LastName:  "Smith123", // Invalid Last Name
			Avatar:    "avatar_url",
			Number:    "1234567890",
			Email:     "test@example.com",
			Password:  "password123",
			Address:   "123 Main St",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Last Name must contain only letters."))
	})
}

func TestCustomerAvatar(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Avatar is required`, func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "Johnny",
			LastName:  "Smith",
			Avatar:    "", // Avatar is required
			Number:    "0843848904",
			Email:     "test@example.com",
			Password:  "password123",
			Address:   "123 Main St",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Avatar is required."))
	})
}

func TestCustomerNumber(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Phone Number is required`, func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "Johnny",
			LastName:  "Smith",
			Avatar:    "https://example.com/avatar.jpg",
			Number:    "", // Phone Number is required
			Email:     "test@example.com",
			Password:  "password123",
			Address:   "123 Main St",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Phone Number is required."))
	})

	t.Run(`Phone Number length is 10 digits`, func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "Johnny",
			LastName:  "Smith",
			Avatar:    "https://example.com/avatar.jpg",
			Number:    "084", // Invalid Phone Number length
			Email:     "test@example.com",
			Password:  "password123",
			Address:   "123 Main St",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal(fmt.Sprintf("Phone Number length is not 10 digits.")))
	})
}

func TestCustomerEmail(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Email is required`, func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "Johnny",
			LastName:  "Smith",
			Avatar:    "https://example.com/avatar.jpg",
			Number:    "0918543621",
			Email:     "", // Email is required
			Password:  "12345678",
			Address:   "123 Main St",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Email is required."))
	})

	t.Run(`Invalid email format`, func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "Johnny",
			LastName:  "Smith",
			Avatar:    "https://example.com/avatar.jpg",
			Number:    "0843848562",
			Email:     "invalid-email", // Invalid email format
			Password:  "12345678",
			Address:   "123 Main St",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Invalid email format."))
	})
}

func TestCustomerPassword(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Password is required`, func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "Johnny",
			LastName:  "Smith",
			Avatar:    "https://example.com/avatar.jpg",
			Number:    "0843848562",
			Email:     "test@example.com",
			Password:  "", // Password is required
			Address:   "123 Main St",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Password is required."))
	})

	t.Run(`Password must be at least 8 characters`, func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "Johnny",
			LastName:  "Smith",
			Avatar:    "https://example.com/avatar.jpg",
			Number:    "0843848562",
			Email:     "test@example.com",
			Password:  "12345", // Password is too short
			Address:   "123 Main St",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Password must be at least 8 characters."))
	})
}

func TestCustomerAddress(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Address is required`, func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "Johnny",
			LastName:  "Smith",
			Avatar:    "https://example.com/avatar.jpg",
			Number:    "0843848562",
			Email:     "test@example.com",
			Password:  "123456789",
			Address:   "", // Address is required
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Address is required."))
	})
}

func TestCustomerGender(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Gender is required`, func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "Johnny",
			LastName:  "Smith",
			Avatar:    "https://example.com/avatar.jpg",
			Number:    "0843848562",
			Email:     "test@example.com",
			Password:  "123456789",
			Address:   "123 Main St",
			GenderID:  0, // Gender is required
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Gender is required"))
	})
}

func TestAllCustomer(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("All correct", func(t *testing.T) {
		customer := entity.Customer{
			FirstName: "John",
			LastName:  "Doe",
			Avatar:    "https://example.com/avatar.png",
			Number:    "0123456789",
			Email:     "john.doe@example.com",
			Password:  "securepassword123",
			Address:   "123 Main St, Springfield",
			GenderID:  1,
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}
