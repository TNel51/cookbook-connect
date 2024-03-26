import {type ReactElement, useState} from "react";
import useSWR from "swr";

import type {Ingredient} from "@/entities/ingredient.entity";
import {fetcher} from "@/lib/swrFetcher";

export default function IngrTest(): ReactElement {
    const [queryParams, setQueryParams] = useState<string>("?key=beef");
    const {data: ingr, error: ingrErr} = useSWR<Ingredient[], Error>(["/api/ingredients", queryParams], fetcher);

    return <div>
        <input className="text-black p-1" onChange={e => { setQueryParams(`?key=${e.target.value}`) }} />
        {ingrErr ? <p>Error loading ingredients</p> : ingr?.map(i => <p key={i.id}>{i.text}</p>)}
    </div>;
}
