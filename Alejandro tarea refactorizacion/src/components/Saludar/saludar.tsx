import React , {useState, useEffect} from "react";
import { IonAvatar, IonItem, IonLabel, IonList , IonContent,  IonInfiniteScroll, IonInfiniteScrollContent} from "@ionic/react";
import style from "./saludar.module.css";
import {productoService, Producto } from "../../service/productoService";
export const Saludar = () => {  
    
    const [productos, setProductos] = useState<Producto[]>([]);
    const [productosVisibles, setproductosVisibles] = useState<Producto[]>([]);
    const [pagina, setpaginas] = useState(1);


    useEffect(() => {
        productoService()
          .then(data => {
            setProductos(data);
            setproductosVisibles(data.slice(0, cadItem)); })    
          .catch(error => console.error('Error fetching products:', error));
      }, []);


      const getItemPorZoom  = () => {
        const zoom = window.devicePixelRatio; 
        if (zoom >= 1) {
          return 8; 
        } else if (zoom >= 1.5) {
          return 12; 
        } else {
          return 16;
        }
      };
      
      const cadItem = getItemPorZoom();
     
      const cargarScroll = (event: CustomEvent<void>) => {
        setTimeout(() => {
            const siguientePAagina = pagina + 1;
            const newItems = productos.slice(0, siguientePAagina * cadItem);
            if (newItems.length === productosVisibles.length) {
                (event.target as HTMLIonInfiniteScrollElement).complete();
                return;
            }
            setproductosVisibles(newItems);
            setpaginas(siguientePAagina);
            (event.target as HTMLIonInfiniteScrollElement).complete();
        }, 500);
    };
    return (
    <IonContent>  
        <IonList>
    {productosVisibles.map(producto => (
            <IonItem key={producto.id}>
            <IonAvatar aria-hidden="true" slot="start">
                <img className={style.avatar} src={producto.image} alt={producto.title} />
            </IonAvatar>
            <div>
                <div>
                 <p className={style["responsive-text"]}>{producto.title}</p>
                </div>
                <div>
                 <p className={style["responsive-text"]}>$ {producto.price}</p>
                </div>
           </div>
        
            </IonItem>
    ))}
     </IonList>
     <IonInfiniteScroll onIonInfinite={cargarScroll}>
     <IonInfiniteScrollContent></IonInfiniteScrollContent>
            </IonInfiniteScroll>
  </IonContent>
    );
    }