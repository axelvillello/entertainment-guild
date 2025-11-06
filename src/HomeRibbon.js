import { useAuth } from "./providers/AuthProvider";
import { Link } from 'react-router-dom';
import ShoppingCart from "./ShoppingCart";

const HomeRibbon = () => {
    const auth = useAuth();
    const linkAesthetics = {
        padding: 5
    }

    return (
        console.log("Auth user:", auth.user),
        <div>
            {
                !auth.user ? 
                (
                    //parameterised navigation for reuse of displayProducts
                    <span className="Home-ribbon">
                        <Link style={linkAesthetics} to="/">Home</Link>
                        ||
                        <Link style={linkAesthetics} to="/displayProducts/Books">Books</Link>
                        <Link style={linkAesthetics} to="/displayProducts/Movies">Movies</Link>
                        <Link style={linkAesthetics} to="/displayProducts/Games">Games</Link>
                        ||
                        <Link style = {linkAesthetics} to="/loginUser">Log In</Link>
                        <ShoppingCart/>
                    </span>
                )
                :
                auth.user.IsAdmin === true ? (
                    <span>
                        <button onClick={() => auth.logOut()} className="btn-submit">
                            Log Out
                        </button>
                    </span>
                ) 
                : 
                (
                    <span>
                        <Link style={linkAesthetics} to="/">Home</Link>
                        ||
                        <Link style={linkAesthetics} to="/displayProducts/Books">Books</Link>
                        <Link style={linkAesthetics} to="/displayProducts/Movies">Movies</Link>
                        <Link style={linkAesthetics} to="/displayProducts/Games">Games</Link>
                        ||
                        <button onClick={() => auth.logOut()} className="btn-submit">
                            Log Out
                        </button>
                        <ShoppingCart/>
                    </span>
            )}

        </div>
    )
}

export default HomeRibbon;