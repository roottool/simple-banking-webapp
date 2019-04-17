export interface Balance {
  id: number | string;
  amount: number;
  createdAt: Date;
}

export interface BalanceCreateRequestBody {
  balanceId: string | number;
  amount: number;
}

export interface BalanceCreateResponseBody {
  balance: Balance;
}
