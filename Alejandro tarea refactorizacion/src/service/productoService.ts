export interface Producto {
        price: number;
        id: number;
        title: string;
        image: string;
    }

    export const productoService = async (): Promise<Producto[]> => {
       try{
        const response = await fetch("https://fakestoreapi.com/products?");
        if (!response.ok) {
            throw new Error("Error al obtener los productos");
          }
        const data = await response.json();
        return data;
       } catch (error) {
        console.error("Error en la consulta fetch:", error);
        return [];
       }
    }