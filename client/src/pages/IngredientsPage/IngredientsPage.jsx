import * as React from 'react';
import SideBar from "../../components/SideBar/SideBar"
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"
import IngredientSearch from "../../components/IngredientSearch/IngredientSearch"
import './IngredientsPage.css'
import IngredientChip from "../../components/IngredientChip/IngredientChip"

export default function Ingredients() {

    const [showChip, setShowChip] = React.useState(true);

    const handleDelete = () => {
        setShowChip(false);
    };

    return(
        <>
        <span style={{display: "flex"}}>
            <SideBar></SideBar>
            <ContentWrapper>
                <span className="IngredientsContent">
                    <IngredientSearch></IngredientSearch>
                </span>

            </ContentWrapper>
        </span>
        </>
    )
};