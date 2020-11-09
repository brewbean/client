import { useState } from 'react';

const images = {
    'ETHIOPIA GOGUGU': 'https://cdn.shopify.com/s/files/1/2468/1021/products/EthiopiaGWBAG_1024x.gif?v=1592335712',
    'MEXICO TERRUNO NAYARITA': 'https://lavantacoffee.com/wp-content/uploads/2018/08/5Lb-Bag-Mexico.jpg',
    'ETHIOPIA CHELBESSA': 'https://cdn.shopify.com/s/files/1/1348/5769/products/Ethiopia-Danche_12oz-Product_1024x1024.png?v=1590589702',
    'COSTA RICA VOLCAN AZUL': 'https://abundanciacoffee.com/wp-content/uploads/2017/09/FCJVOLCANAZUL-1489780689.png',
    'SUPERNOVA ESPRESSO': 'https://cdn.shopify.com/s/files/1/1348/5769/products/supernova_1024x1024.png?v=1571438908'
}
const Beans = () => {
    const [bean, setBean] = useState("SUPERNOVA ESPRESSO");
    
    return(
        <div>   
            <div>Coffee Beans: 
                <select value={bean} onChange={(e) => setBean(e.target.value)}>
                    <option value="ETHIOPIA GOGUGU">ETHIOPIA GOGUGU</option>
                    <option value="MEXICO TERRUNO NAYARITA">MEXICO TERRUNO NAYARITA</option>
                    <option value="ETHIOPIA CHELBESSA">ETHIOPIA CHELBESSA</option>
                    <option value="COSTA RICA VOLCAN AZUL">COSTA RICA VOLCAN AZUL</option>
                    <option value="SUPERNOVA ESPRESSO">SUPERNOVA ESPRESSO</option>
                </select>
                <img className='coffee-image' alt='' src={images[bean]}/>
            </div>
        </div>
    )
}

export default Beans;