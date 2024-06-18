import Hero from "../hero/Hero";

const Home = ({movies}) =>{
    return (
        <div>
            {console.log("Home", movies)}
            <Hero movies= {movies} />
        </div>
    )
}

export default Home;