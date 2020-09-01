import { useState } from 'react'; 

export const useDiscoverBean = () => {
    const [company_name, setCompanyName] = useState('Stereoscope');
    const [name, setName] = useState('Ethiopian Yirgacheffe');
    const [roast_type, setRoastType] = useState('Light');
    const [country_id, setCountryId] = useState('');
    const [farm_id, setFarmId] = useState('');
    const [process, setProcess] = useState('Washed');
    const [region, setRegion] = useState('Ethiopia');
    const [altitude, setAltitude] = useState('2000km');
    const [profile_note, setProfileNote] = useState(['Blueberry', 'Cranberry', 'Honey']);
    const [about, setAbout] = useState('This is an awesome coffee bean.');

    const setBeanDetails = (bean) => {
        console.log("Setting bean values", bean);
        setCompanyName(bean.company_name);
        setName(bean.name);
        setRoastType(bean.roast_type);
        setCountryId(bean.country_id);
        setFarmId(bean.farm_id);
        setProcess(bean.process);
        setRegion(bean.region);
        setAltitude(bean.altitude);
        setProfileNote(bean.profile_note);
        setAbout(bean.about);
    }
    return (
        {
            data : {
                company_name,
                name,
                roast_type,
                country_id,
                farm_id,
                process,
                region,
                altitude,
                profile_note,
                about
            },
            methods : {
                setCompanyName,
                setName,
                setRoastType,
                setCountryId,
                setFarmId,
                setProcess,
                setRegion,
                setAltitude,
                setProfileNote,
                setAbout,
                setBeanDetails
            }
        }
    )
}




