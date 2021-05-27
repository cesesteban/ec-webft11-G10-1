import "./catalog.css";
import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getCategory, searchProducts } from '../../store/category/category.actions';
import { Button } from '@material-ui/core/';

const FilterGeneres = () => {
    const dispatch = useDispatch()
    let categories = useSelector(state => state.categoryReducer.category)

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    const handleGenere = (e,category) => {
        dispatch(searchProducts(category.name))
     };

    return (
        <>
            {categories&&categories.map((category, index) => {
                if (category.name !== "") {
                    return (
                        <Button key={index} name={category.name}
                            onClick={(e) => { handleGenere(e,category) }}
                            className="button-filter"
                        >
                            {category.name}
                        </Button>
                    )
                }
                return "";
            })}

        </>
    );
};


export default FilterGeneres;
