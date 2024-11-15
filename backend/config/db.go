package config

import (
	"fmt"

	"time"

	"github.com/KUNSALISA/SALISA_SE/entity"

	"gorm.io/driver/sqlite"

	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("manageprofile.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {

	db.AutoMigrate(
		&entity.Customer{},
		&entity.Employee{},
		&entity.Genders{},
		&entity.Positions{},
		&entity.Warehouses{},
	)

	GenderMale := entity.Genders{Gender: "Male"}
	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Male"})

	GenderFemale := entity.Genders{Gender: "Female"}
	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Female"})

	positions := []string{"Manager", "A", "B", "C", "D"}
	positionMap := make(map[string]uint)

	for _, pos := range positions {
		position := entity.Positions{Position: pos}
		db.FirstOrCreate(&position, &entity.Positions{Position: pos})
		positionMap[pos] = position.ID
	}

	hashedPassword, _ := HashPassword("admin")
	startDate := time.Now()

	employee := []entity.Employee{
		{
			E_FirstName: "John",
			E_LastName:  "Doe",
			Email:       "john.doe@example.com",
			Number:      "1234567890",
			Password:    hashedPassword,
			Address:     "123 Main St",
			StartDate:   startDate,
			AccessLevel: "Manager",
			GenderID:    GenderMale.ID,
			PositionID:  positionMap["Manager"],
		},
		{
			E_FirstName: "Jane",
			E_LastName:  "Smith",
			Email:       "jane.smith@example.com",
			Number:      "0987654321",
			Password:    hashedPassword,
			Address:     "456 Elm St",
			StartDate:   startDate,
			AccessLevel: "A",
			GenderID:    GenderFemale.ID,
			PositionID:  positionMap["Developer"],
		},
		{
			E_FirstName: "Alice",
			E_LastName:  "Johnson",
			Email:       "alice.johnson@example.com",
			Number:      "1122334455",
			Password:    hashedPassword,
			Address:     "789 Pine St",
			StartDate:   startDate,
			AccessLevel: "B",
			GenderID:    GenderFemale.ID,
			PositionID:  positionMap["Tester"],
		},
		{
			E_FirstName: "Bob",
			E_LastName:  "Brown",
			Email:       "bob.brown@example.com",
			Number:      "6677889900",
			Password:    hashedPassword,
			Address:     "321 Oak St",
			StartDate:   startDate,
			AccessLevel: "C",
			GenderID:    GenderMale.ID,
			PositionID:  positionMap["HR"],
		},
		{
			E_FirstName: "Eve",
			E_LastName:  "Davis",
			Email:       "eve.davis@example.com",
			Number:      "4455667788",
			Password:    hashedPassword,
			Address:     "654 Maple St",
			StartDate:   startDate,
			AccessLevel: "D",
			GenderID:    GenderFemale.ID,
			PositionID:  positionMap["Support"],
		},
	}

	for _, emp := range employee {
		db.FirstOrCreate(&emp, &entity.Employee{Email: emp.Email})
	}

}
