import type {PropsWithChildren, ReactElement} from "react";

export default function RecipeList({children}: PropsWithChildren): ReactElement {
    return <div>
        <div className="RecipeList">
            {children}
        </div>
    </div>;
}
