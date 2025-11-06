import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import { useLoading } from "./providers/LoadingProvider";
import { useParams } from "react-router-dom";
import Search from "./Search";

const SearchProducts = () => {
    const [products, setProducts] = useState([]);
    const [stock, setStock] = useState([]);
    const [pricedProducts, setPricedProducts] = useState([]);
    const loading = useLoading();
    const {searchTerm} = useParams();

    //GET request for all products 
    useEffect (() => {
        loading.setLoadingStatus(true);
        const promise = axios.get("http://localhost:3001/api/inft3050/Product");
        promise.then((response) => {
            console.log(response);
            const loadedProducts = response.data.list;
            const filteredProducts = loadedProducts.filter((lp) => lp.Name.toLowerCase().includes(searchTerm.toLowerCase()));
            if (filteredProducts) {    
                setProducts(filteredProducts);
            }
            else {
                setProducts([]);
            }
        });
    }, [searchTerm])

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
                    if (!matchedProduct) return null;
                    return{
                        ...stockItem,
                        stocktakeId: stockItem.ItemId,
                        ...matchedProduct,
                    };
                })
                .filter(Boolean);
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
        <div
            className="Flyin-anim"
            style={{
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                flexDirection: "column"
            }
        }>
            <Search/>
            <h1>Search Results</h1>
            <div className="Container-flex">
                {   loading.loadingProg ? 
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
                        <p>No results</p>
                    )

                }
            </div>
        </div>
    );
}

export default SearchProducts;