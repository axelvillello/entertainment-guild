//Product loading component that intakes a "genre" based on a parameter
//and loads all available products of that genre
//WRITTEN BY: Axel Ello

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Product from "./Product";
import { useLoading } from "./providers/LoadingProvider";

const DisplayProducts = () => {

    const [products, setProducts] = useState([]);
    const [genreProducts, setGenreProducts] = useState([]);
    const [stock, setStock] = useState([]);
    const [pricedProducts, setPricedProducts] = useState([]);
    
    const loading = useLoading();
    const {genre} = useParams();

    //GET request for all listed genres
    useEffect (() => { 
        loading.setLoadingStatus(true);
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
        const fetchAllProducts = async () => {

            //Attempt at cycling through pages 
            let allProducts = [];
            let currentPage = 1;
            let pageSize = 25;
            //while (true){
                const productResponse = await axios.get(`http://localhost:3001/api/inft3050/Product?page=${currentPage}&limit=${pageSize}`);
                console.log(productResponse);
                const loadedProducts = productResponse.data.list;
                const filteredProducts = loadedProducts.filter((lp) => genreProducts.includes(lp.ID));  //only include products contained in the genre via ID
                allProducts = allProducts.concat(filteredProducts);
                //if (loadedProducts.length < pageSize) break; 
                //currentPage++;
            //}
            
            if (allProducts) {    
                setProducts(allProducts);
            }
            else {
                setProducts([]);
            }
        }

        fetchAllProducts();

    }, [genreProducts])

    //GET request for all stock 
    useEffect (() => {
        const promise = axios.get("http://localhost:3001/api/inft3050/Stocktake");
        promise.then((response) => {
            console.log(response);
            const loadedStock = response.data.list;
            if (loadedStock) {    
                setStock(loadedStock);
            }
            else {
                setStock([]);
            }
        });
    }, [products])

    useEffect (() => {
        if (products.length > 0 && stock.length > 0){
            const priced = stock.map(stockItem => {
                const matchedProduct = products.find(p => p.ID === stockItem.ProductId);
                return {
                    ...stockItem,
                    stocktakeId: stockItem.ItemId,
                    ...matchedProduct,
                };
            });
            
            if (priced) {    
                setPricedProducts(priced);
            }
            else {
                setPricedProducts([]);
            }
            loading.setLoadingStatus(false);
        }
        else {
            loading.setLoadingStatus(false);    
        }
    }, [stock, products])

    return (
        <div style={{
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column"
        }}>
            <h1 className="Page-headings">{genre}</h1>
            <div 
                className="Container-flex"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)", 
                }}>
                    {/*Creates a loading wheel while in loading state*/}
                {loading.loadingProg ? 
                (
                    <img className="Loading-wheel" alt="Loading..." src="/images/loading.png"/>
                )
                :
                products.length > 0 ?
                (
                    pricedProducts.map((p) => (<Product key={p.stocktakeId} id ={p.stocktakeId} title={p.Name} author={p.Author} published={p.Published} description={p.Description} price={p.Price} source={p.Source.SourceName}/>))
                )
                : 
                (
                    <p className="Flyin-anim">{genre} are out of stock!</p>
                )

                }
            </div>
        </div>
    );
}

export default DisplayProducts;