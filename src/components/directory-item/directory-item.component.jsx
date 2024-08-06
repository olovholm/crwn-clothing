import {BackgroundImage, Body, DirectoryItemContainer} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
    const {imageUrl, title} = category
    return (
        <DirectoryItemContainer>
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
