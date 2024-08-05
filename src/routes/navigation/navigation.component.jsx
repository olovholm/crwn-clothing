import {Link, Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";
import "./navigation.styles.scss"

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../contexts/cart.context";

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen, setIsCartOpen } = useContext(CartContext)

    const signOutHandler = async () => {
        await signOutUser()
    }


    console.log(currentUser)
    return (
        <Fragment>
            <div className={'navigation'}>
                <Link className={"logo-container"} to={"/"}>
                    <CrwnLogo className={"logo"}/>
                </Link>
                <div className={'nav-links-container'}>
                    <Link className={"nav-link"} to={"/shop"}>SHOP</Link>
                    { currentUser ? (
                        <span className={"nav-link"} onClick={signOutHandler}> SIGN OUT </span>
                    ) : (
                        <Link className={"nav-link"} to={"/auth"} >SIGN IN</Link>
                    )}
                <CartIcon/>
                </div>
                { isCartOpen && <CartDropdown/>}
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation
