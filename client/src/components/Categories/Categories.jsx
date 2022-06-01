import CategotyCard from "../CategotyCard/CategoryCard"
import style from './Categories.module.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export default function Categories() {


    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1235 },
            items: 3.8,
            partialVisibilityGutter: 40, // this is optional if you are not using partialVisible props
        },
        desktop4: {
            breakpoint: { max: 1440, min: 1235 },
            items: 3.2,
            partialVisibilityGutter: 40, // this is optional if you are not using partialVisible props
        },
        desktop3: {
            breakpoint: { max: 1235, min: 1024 },
            items: 2.9,
            partialVisibilityGutter: 40, // this is optional if you are not using partialVisible props
        },
        desktop2: {
            breakpoint: { max: 1024, min: 700 },
            items: 2,
            partialVisibilityGutter: 40, // this is optional if you are not using partialVisible props
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1.5,
            partialVisibilityGutter: 30, // this is optional if you are not using partialVisible props
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 30, // this is optional if you are not using partialVisible props
        },
    };
    const carTypes = [
        "Luxury",
        "Premium",
        "Pick-up",
        "Van",
        "Hybrid",
        "SUV Full-Size",
        "SUV",
    ]
    const categories = [
        { category: "Luxury", image: "https://i.ibb.co/pWHfSD2/Luxury.jpg", aditional: "", value:"Luxury" },
        { category: "Pick Up", image: "https://i.ibb.co/fnLj2zW/RP-I.jpg", aditional: "", value:"Pick-up" },
        { category: "SUV's", image: "https://i.ibb.co/xgb9MMs/MC-I.jpg", aditional: "", value: "SUV" },
        { category: "Full Size", image: "https://i.ibb.co/zJvW1Pt/LG-I.jpgg", aditional: "", value: "SUV Full-Size" },
        { category: "Hybrid", image: "https://i.ibb.co/tPm86zN/RAV-3.png", aditional: "", value:"Hybrid" },
        { category: "Vans", image: "https://i.ibb.co/mcZVbn2/RT-2.jpg", aditional: "", value:"Van" },
        { category: "Premium", image: "https://i.ibb.co/6sWR8yk/C180-1.jpg", aditional: "", value:"Premium" },
    ]

  

    return (
        <div className={style.container}>
            <Carousel containerClass="container"  responsive={responsive} infinite={true} autoPlay={false} 
            shouldResetAutoplay={false} >
                {categories.map((e,k) => <CategotyCard key={k+1} card={e}  />)}
            </Carousel>

        </div>

    );
}