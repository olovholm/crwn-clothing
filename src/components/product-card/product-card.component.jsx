import './product-card.styles.scss'
import Button from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {InvertedButton} from "../button/button.styles";

const ProductCard = ({product}) => {

    const {addItemToCart} = useContext(CartContext)

    const addToCart = () => {
        addItemToCart(product)
    }


    const {name, price, imageUrl} = product
    return (
        <div className={"product-card-container"}>
            <img src={imageUrl} alt={name}/>
            <div className={"footer"}>
                <span className={"name"}>{name}</span>
                <span className={"price"}>{price}</span>
            </div>
            <InvertedButton onClick={addToCart}>Add to cart</InvertedButton>
        </div>
    )


}

export default ProductCard
