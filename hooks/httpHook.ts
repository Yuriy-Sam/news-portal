export const useHttp = () => {
  const request = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body: FormData | null = null,
    headers = {}
  ) => {
    try {
      const requestOptions: RequestInit = {
        method,
        headers,
        body,
        // cache: process.env.NODE_ENV !== "production" ? "no-store" : "default",
      };

      if (!(body instanceof FormData)) {
        requestOptions.headers = { "Content-Type": "application/json" };
      }

      const response = await fetch(url, requestOptions);
      console.log("http response", response);
      const data = await response.json();
      if (!response.ok) {
        if (data.error) {
          throw new Error(`${data.error}`);
        }

        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      return data;
    } catch (e) {
      throw e;
    }
  };

  return { request };
};

// hooks/httpHook.ts
// import { useState, useCallback } from "react";

// type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// export const useHttp = () => {
//   const request = useCallback(
//     async (
//       url: string,
//       method: HttpMethod = "GET",
//       body: any = null,
//       headers: Record<string, string> = {}
//     ) => {
//       try {
//         const requestOptions = {
//           method,
//           headers,
//           body,
//         };

//         // For POST or PUT requests with FormData, do not set the Content-Type header,
//         // as it will be automatically set by fetch with the appropriate boundary.
//         if (!(body instanceof FormData)) {
//           requestOptions.headers["Content-Type"] = "application/json";
//         }

//         const response = await fetch(url, requestOptions);
//         const data = await response.json();

//         if (!response.ok) {
//           if (data.error) {
//             throw new Error(data.error);
//           }

//           throw new Error(`Could not fetch ${url}, status: ${response.status}`);
//         }

//         return data;
//       } catch (error) {
//         throw error;
//       }
//     },
//     []
//   );

//   return { request };
// };
