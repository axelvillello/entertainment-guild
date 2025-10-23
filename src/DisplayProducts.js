//Product loading component that intakes a "genre" based on a parameter
//and loads all available products of that genre
//WRITTEN BY: Axel Ello

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Product from "./Product";

const DisplayProducts = () => {

    const {genre} = useParams();
    const [products, setProducts] = useState([]);
    const [genreProducts, setGenreProducts] = useState([]);
    const [stock, setStock] = useState([]);
    const [pricedProducts, setPricedProducts] = useState([]);

    //GET request for all listed genres
    useEffect (() => { 
        const promise = axios.get("http://localhost:3001/api/inft3050/Genre"); 
        promise.then((response) => { 
            console.log(response); 
            const genres = response.data.list; 
            const loadedGenres = genres.find((g) => g.Name === genre);
            if (loadedGenres) {
                const productIDs = loadedGenres["Product List"].map((pl) => pl.ID); //create list of all product IDs of that genre
                setGenreProducts(productIDs);
            } 
            else {
                setGenreProducts([]); 
            }
        }) 
    }, [genre])

    //GET request for all products 
    useEffect (() => {
        const promise = axios.get("http://localhost:3001/api/inft3050/Product");
        promise.then((response) => {
            console.log(response);
            const loadedProducts = response.data.list;
            const filteredProducts = loadedProducts.filter((lp) => genreProducts.includes(lp.ID));  //only include products contained in the genre via ID
            if (filteredProducts) {    
                setProducts(filteredProducts);
            }
            else {
                setProducts([]);
            }
        });
    }, [genreProducts])

    //GET request for all stock 
    useEffect (() => {
        const promise = axios.get("http://localhost:3001/api/inft3050/Stocktake");
        promise.then((response) => {
            console.log(response);
            const loadedStock = response.data.list;
            setStock(loadedStock);
        });
    }, [products])

    useEffect (() => {
            if (products.length > 0 && stock.length > 0){
                const priced = stock.map(stockItem => {
                    const matchedProduct = products.find(p => p.ID === stockItem.ProductId);
                return{
                    ...stockItem,
                    ...matchedProduct,
                };
            });
                setPricedProducts(priced);
            }
    }, [stock, products])

    return (
        <div>
            <h1>{genre}</h1>
            <div className="Container-flex">
                {products.length > 0 ?
                    (
                        pricedProducts.map((p) => (<Product key={p.ID} title={p.Name} author={p.Author} published={p.Published} description={p.Description} price={p.Price} source={p.Source.SourceName}/>))
                    ) 
                    : 
                    (<p>{genre} are out of stock!</p>)

                }
            </div>
        </div>
    );
}

export default DisplayProducts;