import apiClient from "../axios/api-client";
import { ApiResponse } from "../types/auth.types";
import {
  CreateStore,
  CreateStoreResponse,
  sendInvitationEmailParams,
  sendInvitationEmailResponse,
} from "../types/store.types";

async function createStore(
  data: CreateStore
): Promise<ApiResponse<CreateStoreResponse>> {
  const response = await apiClient.post(`/platforms`, data);
  return response.data;
}

async function sendStoreInvitationEmailCreateStore(
  data: sendInvitationEmailParams
): Promise<ApiResponse<sendInvitationEmailResponse>> {
  const response = await apiClient.post(`auth/invitations/invite-user`, data);
  return response.data;
}

// 🔹 Params Interface
export type GetStoresParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type Store = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  sallaConnectedAt: string | null;
  creator: { id: string; fullName: string | null; email: string };
  stats: {
    totalUsers: number;
    totalWarehouses: number;
    pendingInvitations: number;
  };
};

// Result shape for store list queries (includes pagination flags)
export type StoresQueryResult = {
  data: Store[];
  total: number;
  currentPage: number;
  totalPages: number;
  limit: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
};

// 🔹 Main API Function
export async function getStores(
  params: GetStoresParams
): Promise<StoresQueryResult> {
  const response = await apiClient.get("/stores", {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      search: params.search ?? "",
      sortBy: params.sortBy ?? "createdAt",
      sortOrder: params.sortOrder ?? "desc",
    },
  });
  const stores = response.data?.data?.stores ?? [];
  const pagination = response.data?.data?.pagination ?? {};
  return {
    data: stores,
    total: pagination.totalCount ?? stores.length,
    currentPage: pagination.currentPage ?? 1,
    totalPages: pagination.totalPages ?? 1,
    limit: pagination.limit ?? 10,
    hasNextPage: pagination.hasNextPage ?? false,
    hasPreviousPage: pagination.hasPreviousPage ?? false,
  };
}

async function deleteStore(storeId: string): Promise<ApiResponse<null>> {
  const response = await apiClient.delete(`/stores/${storeId}`);
  return response.data;
}

export { createStore, sendStoreInvitationEmailCreateStore, deleteStore };
