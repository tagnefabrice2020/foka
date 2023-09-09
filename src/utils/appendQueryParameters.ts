type paramsType = {
  [key: string]: number | string | undefined
}

type Props = {
  url?: string;
  params: paramsType;
};

export const appendQueryParameters = ({ url, params }: Props): void => {
   const queryString = Object.keys(params)
     .map((key) => {
       const value = params[key];
       if (typeof value === "string" || typeof value === "number") {
         return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
       }
       // Handle undefined or other types here if needed
       return ""; // You can choose to skip invalid values or handle them differently
     })
     .join("&");
  
  if (url === undefined) {
    url = typeof window !== "undefined" ? window.location.href as unknown as string : "";
    window.history.pushState(
      {},
      "",
      window.location.pathname + "?" + queryString
    );
  }
 
  window.history.pushState(
    {},
    "",
    window.location.pathname + "?" + queryString
  );
}
