import { useAuth } from "./AuthProvider";
import { Link } from 'react-router-dom';
import ShoppingCart from "./ShoppingCart";

const HomeRibbon = () => {
    const auth = useAuth();

    const padding = {
        padding: 5
    }

    return (
        <span>
            {!auth.user ? 
            (
                <span>
                    <Link style={padding} to="/">Home</Link>
                    ||
                    <Link style={padding} to="/displayProducts/Books">Books</Link>
                    <Link style={padding} to="/displayProducts/Movies">Movies</Link>
                    <Link style={padding} to="/displayProducts/Games">Games</Link>
                    ||
                    <Link style = {padding} to="/loginUser">Log In</Link>
                    <ShoppingCart/>
                </span>
            )
            :
            auth.user.isAdmin? (
                <span>
                    Admin!!!
                    <button onClick={() => auth.logOut()} className="btn-submit">
                        Log Out
                    </button>
                </span>
            ) 
            : 
            (
                <span>
                    <Link style={padding} to="/">Home</Link>
                    ||
                    <Link style={padding} to="/displayProducts/Books">Books</Link>
                    <Link style={padding} to="/displayProducts/Movies">Movies</Link>
                    <Link style={padding} to="/displayProducts/Games">Games</Link>
                    ||
                    <button onClick={() => auth.logOut()} className="btn-submit">
                        Log Out
                    </button>
                    <ShoppingCart/>
                </span>
            )}

        </span>
    )
}

export default HomeRibbon;