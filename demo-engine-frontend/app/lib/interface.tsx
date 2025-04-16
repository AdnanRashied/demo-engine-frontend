export interface User {
  id: string;
  role: string;
  name: string;
  email: string;
}

export type LoginEvent = {
  id: number;
  email: string;
  success: boolean;
  timestamp: string;
};
