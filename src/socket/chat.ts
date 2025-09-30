export interface User {
  id: number;
  firstName: string;
  lastName: string;
  countryCode: string;
  contactNo: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface Chat {
  id: number;
  friendId: number;
  friendName: string;
  lastMessage: string;
  lastTimeStamp: string;
  unreadCount: number;
  profileImage: string;
  from: User;
  to: User;
  createdAt: string;
  updateAt: string;
  status: string;
  message: string;
}

export interface WSRequest {
  type: string;
  formUserId?: number;
  toUserId?: number;
  message?: string;
}

export interface WSResponse {
  type: string;
  payload: any;
}
