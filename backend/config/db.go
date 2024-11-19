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

	managerPassword, _ := HashPassword("manager123")
	aPassword, _ := HashPassword("a123456")
	bPassword, _ := HashPassword("b123456")
	cPassword, _ := HashPassword("c123456")
	dPassword, _ := HashPassword("d123456")
	startDate := time.Now()

	employee := []entity.Employee{ //ยังไม่ใส่รูป Avatar
		{
			E_FirstName: "John",
			E_LastName:  "Doe",
			Email:       "Manager@gmail.com",
			Number:      "1234567890",
			Password:    managerPassword,
			Avatar:      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVwAAAFcBAMAAAB2OBsfAAAAElBMVEXu7u4AAAD",
			Address:     "123 Main St",
			StartDate:   startDate,
			AccessLevel: "Manager",
			GenderID:    GenderMale.ID,
			PositionID:  positionMap["Manager"],
		},
		{
			E_FirstName: "Jane",
			E_LastName:  "Smith",
			Email:       "A@gmail.com",
			Number:      "0987654321",
			Password:    aPassword,
			Address:     "456 Elm St",
			StartDate:   startDate,
			AccessLevel: "A",
			GenderID:    GenderFemale.ID,
			PositionID:  positionMap["A"],
		},
		{
			E_FirstName: "Alice",
			E_LastName:  "Johnson",
			Email:       "B@gmail.com",
			Number:      "1122334455",
			Password:    bPassword,
			Address:     "789 Pine St",
			StartDate:   startDate,
			AccessLevel: "B",
			GenderID:    GenderFemale.ID,
			PositionID:  positionMap["B"],
		},
		{
			E_FirstName: "Bob",
			E_LastName:  "Brown",
			Email:       "C@gmail.com",
			Number:      "6677889900",
			Password:    cPassword,
			Address:     "321 Oak St",
			StartDate:   startDate,
			AccessLevel: "C",
			GenderID:    GenderMale.ID,
			PositionID:  positionMap["C"],
		},
		{
			E_FirstName: "Eve",
			E_LastName:  "Davis",
			Email:       "D@gmail.com",
			Number:      "4455667788",
			Password:    dPassword,
			Address:     "654 Maple St",
			StartDate:   startDate,
			AccessLevel: "D",
			GenderID:    GenderFemale.ID,
			PositionID:  positionMap["D"],
		},
	}
	for _, emp := range employee {
		db.FirstOrCreate(&emp, &entity.Employee{Email: emp.Email})
	}

}
