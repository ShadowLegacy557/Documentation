import React, { useEffect, useState } from "react";
import PalladiumObjectViewer from "./PalladiumObjectViewer";

export default function PalladiumObjectList({ type, heading = 'h2', showFullPowerExamples = false }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        import(`@site/src/palladium_docs/${type}.json`)
            .then((res) => {
                setData(res.default)
            })
            .catch(_ => null);
    }, []);

    return (<>
        {data && data.map(entry => <React.Fragment key={entry.namespace + ":" + entry.path}>
            <PalladiumObjectViewer data={entry} heading={heading} />
            <hr />
        </React.Fragment>
        )}
    </>
    );
}