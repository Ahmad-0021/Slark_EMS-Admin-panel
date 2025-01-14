export interface IUserCreate {
    username: string;
    email: string;
    password: string;  
    basicPayForThisMonth: number;
    committedHoursForThisMonth: number;
    role: string;
    type:string
  
  }