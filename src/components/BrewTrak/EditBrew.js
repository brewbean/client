import { useState, useEffect } from 'react';
import InputRow from 'components/InputRow';
import Dropdown from 'components/DropDown';
import TextArea from 'components/TextArea';
import { useBrewTrak } from 'components/BrewTrak/useBrewTrak';
import { GET_SINGLE_RECIPE, UPDATE_RECIPE } from 'queries';
import { useQuery, useMutation } from 'urql';

const EditBrew = (props) => {
    const [brewType, setBrewType] = useState('');
    const [beanWeight, setBeanWeight] = useState('');
    const [beanGrind, setBeanGrind] = useState('');
    const [waterAmount, setWaterAmount] = useState('');
    const [beanType, setBeanType] = useState('');
    const [waterTemp, setWaterTemp] = useState('');
    const [rating, setRating] = useState('');
    const [brewComments, setBrewComments] = useState('');
    const recipe_id = props.match.params.id
    const [updateRecipeResult, updateRecipe] = useMutation(UPDATE_RECIPE);
    
    const submitUpdateRecipe = async () => {
        const object = {
            // "barista_id": 6, //temp-id
            "bean_id": beanType,
            "brew_type": brewType,
            "bean_weight": beanWeight,
            "bean_grind": beanGrind,
            "water_temp": waterTemp,
            "rating": rating,
            "comment": brewComments,
            // "private": true, //temp-setting
            "water_amount": waterAmount
        }
        let result = await updateRecipe({id: recipe_id, ...object});
        console.log("Result", result);
    }
    const [result, reexecuteQuery] = useQuery({
        query: GET_SINGLE_RECIPE,
        variables: { id: recipe_id }
    });
    const { data, fetching, error } = result;
    useEffect(() => {
        if (fetching) return <p>Loading...</p>;
        if (error) return <p>Oh no... {error.message}</p>;
        if (data) {
            const { brew_type, bean_weight, bean_grind,water_amount, bean, water_temp, rating, comment} = data.recipe_by_pk;
            setBrewType(brew_type)
            setBeanWeight(bean_weight)
            setBeanGrind(bean_grind)
            setWaterAmount(water_amount)
            setBeanType(bean.name)
            setWaterTemp(water_temp)
            setRating(rating)
            setBrewComments(comment)
        }
    },[data, fetching, error]);
    
    return (
        <div>
            <Dropdown value={brewType} onChange={(e) => setBrewType(e.target.value)} options={["Pour Over", "Aeropress", "Siphon", "Moka Pot", "French Press"]} label="brew type" />
            <InputRow value={beanWeight} onChange={(e)=>setBeanWeight(e.target.value)} placeholder='Enter coffee bean weight' label='coffee bean amount' />
            <Dropdown value={beanGrind} onChange={(e) => setBeanGrind(e.target.value)} options={["Extra Fine", "Fine", "Medium-fine", "Medium-coarse", "Coarse", "Extra coarse"]} label="bean grind" />
            {/* Serving Amount */}
            <InputRow value={waterAmount} onChange={(e) => setWaterAmount(e.target.value)} placeholder='Enter water weight' label='water amount' />
            <InputRow value={beanType} onChange={(e) => setBeanType(e.target.value)} placeholder='Enter bean type' label='bean type' />
            <InputRow value={waterTemp} onChange={(e) => setWaterTemp(e.target.value)} placeholder='Enter water temperature' label='water temperature' />
            <Dropdown value={rating} onChange={(e) => setRating(e.target.value)} label="Rating" options={["1", "2", "3", "4", "5"]} />
            <TextArea value={brewComments} onChange={(e) => setBrewComments(e.target.value)} placeholder='Enter comments here' label='brewer comments' />
            {/* Create Instructions  */}
            {/* Next button to stage */}
            <div className='flex-none bg-white rounded shadow p-4'>
                <button onClick={submitUpdateRecipe} type="button" className="mt-2 w-full px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                    edit recipe
            </button>
            </div>
        </div>
    )
}

export default EditBrew;