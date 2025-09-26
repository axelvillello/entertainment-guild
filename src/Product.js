//Defines a component that defines a collection of props 
//generically for many different types of products
//WRITTEN BY: Axel Ello

const Product = (props) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>Author: {props.author}</p>
            <p>Published: {props.published}</p>
        </div>
    );
}

export default Product;