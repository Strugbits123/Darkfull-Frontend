export interface CreateStore {
  name: string;
  slug: string;
}

export interface CreateStoreResponse {
  data: {
    store: {
      id: string;
      name: string;
      slug: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
      sallaConnectedAt: string | null;
      creator: {
        id: string;
        fullName: string;
        email: string;
      };
      stats: {
        totalUsers: number;
        totalWarehouses: number;
        pendingInvitations: number;
      };
    };
  };
}

export interface sendInvitationEmailResponse {
  data: {
    invitation: {
      id: string;
      email: string;
      role: string;
      storeName: string;
      expiresAt: string;
    };
  };
}
export interface sendInvitationEmailParams {
  storeId: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  role: string;
  storeName: string;
}
