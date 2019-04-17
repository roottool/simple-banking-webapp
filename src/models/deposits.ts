export interface Deposit {
  id: number | string;
  balanceId: number | string;
  amount: number;
  createdAt: Date;
}

export interface DepositCreateRequestBody {
  balanceId: string | number;
  amount: number;
}

export interface DepositCreateResponseBody {
  deposit: Deposit;
}

export interface DepositListResponseBody {
  deposits: Deposit[];
}

export interface DepositShowResponseBody {
  deposit: Deposit;
}
