import React, { useState } from 'react';
import InputRow from '../InputRow/index';
import Dropdown from '../DropDown/index';
import TextArea from '../TextArea/index';

const BrewDetails = ({date, beanWeight, brewType, beanGrind, waterAmount, beanType, waterTemp, bloomWaterAmount, bloomTime, brewComments, rating, setDate, setBeanWeight, setBrewType, setBeanGrind, setWaterAmount, setBeanType, setWaterTemp, setBloomWaterAmount, setBloomTime, setRating, setBrewComments}) => {

    return (
        <div>
            <Dropdown value={brewType} onChange={setBrewType} options={["Pour Over", "Aeropress", "Siphon", "Moka Pot", "French Press"]} label="brew type" />
            <InputRow value={beanWeight} onChange={setBeanWeight} placeholder='Enter coffee bean weight' label='coffee bean amount' />
            <Dropdown value={beanGrind} onChange={setBeanGrind} options={["Extra Fine", "Fine", "Medium-fine", "Medium-coarse", "Coarse", "Extra coarse"]} label="bean grind"/>
            <InputRow value={waterAmount} onChange={setWaterAmount} placeholder='Enter water weight' label='water amount' />
            <InputRow value={beanType} onChange={setBeanType} placeholder='Enter bean type' label='bean type' />
            <InputRow value={waterTemp} onChange={setWaterTemp} placeholder='Enter water temperature' label='water temperature' />
            <InputRow value={bloomWaterAmount} onChange={setBloomWaterAmount} placeholder='Enter bloom water amount' label='bloom water amount' />
            <InputRow value={bloomTime} onChange={setBloomTime} placeholder='Enter bloom time' label='bloom time' />
            <Dropdown value={rating} onChange={setRating} label="Rating"options={["1", "2", "3", "4", "5"]} />
            <TextArea value={brewComments} onChange={setBrewComments} placeholder='Enter comments here' label='brewer comments' />

        </div>
    )
}

export default BrewDetails;