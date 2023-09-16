import Card from "./Card";
import { testimonials } from "./data/testimonials";

export default function Grid(){
    return(
        <div className="grid grid-cols-1 gap-2 w-full px-10">
            {testimonials.map((quote, index) => {
                return <Card content={quote.message} author={quote.author} path={quote.path}/>;
            })}
        </div>
    )
}