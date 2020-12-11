import { useState, useEffect } from 'react';
import { useBrewTrak } from 'components/BrewTrak/useBrewTrak';
import { GET_SINGLE_RECIPE, UPDATE_RECIPE, GET_SINGLE_BEAN_ID_BY_NAME } from 'queries';
import { useQuery, useMutation } from 'urql';
import { useParams } from 'react-router-dom';
import Edit from './Edit';

const EditBrew = () => {
    const { id } = useParams()
    const [result, reexecuteQuery] = useQuery({
        query: GET_SINGLE_RECIPE,
        variables: { id }
    });
    const { data, fetching, error } = result;

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    if (data?.recipe_by_pk) {
        return (
            <Edit id={id} recipe={data.recipe_by_pk}/>
        )
    }
    return null;
}

export default EditBrew;