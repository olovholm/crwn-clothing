import {BackgroundImage, Body, DirectoryItemContainer} from "./directory-item.styles";
import {useNavigate} from "react-router-dom";

const DirectoryItem = ({ category }) => {
    const {imageUrl, title, route} = category
    const navigate = useNavigate()

    const onNavigateHandler = () => navigate(route)
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage className="background-image"
                 imageUrl={imageUrl}
            />
            <Body className="directory-body-container">
                <h2>{title}</h2>
                <p>Shop now</p>
            </Body>
        </DirectoryItemContainer>
    )

}

export default DirectoryItem
