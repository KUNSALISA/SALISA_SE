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
			Avatar:      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAC8gIykjHS8pJik1Mi84R3ZMR0FBR5BnbVV2q5azsKiWpaK81P/lvMj/y6Kl6//u////////tuL/////////////2wBDATI1NUc+R4pMTIr/wqXC////////////////////////////////////////////////////////////////////wAARCAFAAUADASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAIDBAUBBv/EADoQAQACAQIDBQUECgEFAAAAAAABAgMEERIhMQUTQVFhFCIycZE0UlOSFSNCY3KBgqGxwTNDc6Lh8P/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAZEQEBAQEBAQAAAAAAAAAAAAAAEQECITH/2gAMAwEAAhEDEQA/AOkAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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",
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
