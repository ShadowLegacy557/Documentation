import {useEffect, useState} from "react";
import PalladiumObjectViewer from "./PalladiumObjectViewer";

export default function PalladiumObjectList({type}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        import(`@site/src/palladium_docs/${type}.json`)
            .then((res) => setData(res.default))
            .catch(_ => null);
    }, []);

    return (<>
            {data && data.map(entry => <>
                    <PalladiumObjectViewer data={entry} key={entry.namespace + ":" + entry.path}/>
                    <hr/>
                </>
            )}
        </>
    );
}