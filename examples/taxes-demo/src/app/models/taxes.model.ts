
export interface Province {
  code: string;
  province: string;
}

export interface Tax extends Province {
  type: string;
  GST: number;
  PST: number;
}
