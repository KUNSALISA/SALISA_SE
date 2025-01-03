export interface EmployeeInterface {
	ID?: number;
	E_FirstName?: string;
	E_LastName?: string;
	Avatar?: string;
	Number?: string;
	Email?: string;
	Password?: string;
	Address?: string;
	StartDate?: string;
	AccessLevel?: string;
	GenderID?: number;
	Gender?: GendersInterface;
	PositionID?: string;
	Position?: PositionsInterface;
	WarehouseID?: string;
	Warehouse?: WarehousesInterface;
  }

export interface CustomerInterface {
	ID?: number;
	FirstName?: string;
	LastName?: string;
	Avatar?: string;
	Number?: string;
	Email?: string;
	Password?: string;
	Address?: string;
	GenderID?: number;
	Gender?: GendersInterface;
  }

export interface GendersInterface {
    ID?: number;
    Gender: string;
  }

export interface PositionsInterface {
    ID?: number;
    Position: string;
  }

export interface WarehousesInterface {
    ID?: number;
    Warehouse_name: string;
  }
  