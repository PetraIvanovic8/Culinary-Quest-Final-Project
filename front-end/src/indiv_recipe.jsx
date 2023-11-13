import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./indiv_recipe.css";
import axios from 'axios';
import { useState, useEffect } from 'react';

/**
 * A React component that represents one recipe in the list of recipes.
 * @param {*} param0 an object holding any props and a few function definitions passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */

const IndivRecipe = (props)  => {
    const [recipe, setRecipe] = useState([])
    const REACT_APP_SERVER_HOSTNAME = 'http://localhost:3001'

    const loc = useLocation()
    const selectedRecipe = loc.state?.x
    console.log(`selected: ${selectedRecipe}`)

    const fetchRecipe = () => {
        console.log("here2 ", selectedRecipe)
        axios
            .get(`${REACT_APP_SERVER_HOSTNAME}/api/recipes/single/${selectedRecipe}`, { params: {y: selectedRecipe}})
            .then(response => {
                const indivRecipe = response.data.recipe
                setRecipe(indivRecipe)
            })
            .catch(err => {
                console.log("error getting recipe", err)
            })
    }

    useEffect(() => {
        // console.log("here1 ",selectedRecipe)
        fetchRecipe()
        return e => {
            console.log("done")
            console.log(recipe)
        }
    }, [selectedRecipe])

    return (
        <div className="recipe-view">
            <label className="title-label">{recipe.name}</label>

            <div className="image-section">
                <img src = {recipe.img} alt = {recipe.name} />
                <br />
            </div>

            <label className="text-label">Recipe Description:</label>
            <label className="text-box">{recipe.desc}</label>

            <label className="text-label">Recipe Ingredients:</label>
            <label className="text-box">{Array.isArray(recipe.ingr) ? recipe.ingr.join(', ') : recipe.ingr}</label>


            <label className="text-label">Recipe Steps:</label>
            <label className="text-box">{recipe.steps}</label>

            <div className="button-container">
                <Link to={`/recipe-edit/${recipe.id}`} className="button">Edit Recipe</Link>

                <Link to="/recipe-inventory" className="button">Return to Recipe Inventory</Link> {/* for now home should point to recipe inventory later*/}
            </div>
        </div>
    );
};

export default IndivRecipe;

