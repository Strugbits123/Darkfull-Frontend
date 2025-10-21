import { STATUS_COLORS } from "@/constant/product";

 export type TablesRowTypes = {
   id: string | number;
   brand: string;
   platform: string;
   image: string;
   img: string;
   name: string;
   sku: string;
   variantSize: string;
   variantColor: string;
   status: keyof typeof STATUS_COLORS | string;
   quantity: number;
   admin_email: string;
   invitations: {
    email: string;
    status:string
    id:string
    role:string
    firstName:string
    lastName:string
    fullName:string
   }[];
 };


 export type AssignProduct = {
   id: string;
   name: string;
   variant: string;
   sku: string;
   returns: number;
   quantity: number;
   img: string;
 };

  
  
