

import './shop.styles.scss'
import CategoriesPreview from "../categories-preview/categories-preview.component";
import {Route, Routes} from "react-router-dom";
import Category from "../category/category.component";


const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path={":category"} element={<Category/>} />
        </Routes>
    )
}

export default Shop
