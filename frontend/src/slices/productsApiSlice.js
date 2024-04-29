
import {PRODUCTS_URL ,UPLOAD_URL} from "../constants";
import { apiSlice } from "./apiSlices";
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        getProducts:builder.query({
            query : (keyword,pageNumber)=> ({
                url : PRODUCTS_URL,
                params: {keyword,pageNumber},
            }),
            providesTags:['Product'],
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query:(productId) =>({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor:5, 
        }),
        createProduct :builder.mutation({
            query: () =>({
            url:PRODUCTS_URL,
            method:'POST',
            }),
            invalidatesTags : ['Product'],
        }),
        updateProduct: builder.mutation({
            query: ({ productId, ...data }) => ({
              url: `${PRODUCTS_URL}/${productId}`,
              method: 'PUT',
              body: data,
            }),
            invalidatesTags: ['Products'],
          }),

          uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method:'POST',
                body:data,
            })
            }),
        deleteProduct:builder.mutation({
            query:(productId)=>({
                url : `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            })
        })

          }),
    });
export const {useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
useDeleteProductMutation} = productsApiSlice;