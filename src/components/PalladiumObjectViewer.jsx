import React, {useState} from 'react';
import Heading from '@theme/Heading';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import CodeInline from '@theme/CodeInline';
import {Checkbox, FormControlLabel, FormGroup, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Check, Close} from "@mui/icons-material";
import PalladiumObjectType from "./PalladiumObjectType";

export default function PalladiumObjectViewer({data}) {
    const [showAsPower, setShowAsPower] = useState();

    let powerExample = null;

    if (data.example) {
        powerExample = {
            name: "Example Power",
            icon: "minecraft:command_block",
            abilities: {}
        }

        powerExample.abilities[data.path] = data.example;
    }

    return (
        <>
            <Heading as={"h2"}>{data.name} <CodeInline>{data.namespace + ':' + data.path}</CodeInline></Heading>

            {data.description}

            {(data.fields.length || data.example) &&
                <Tabs>
                    {data.fields.length &&
                        <TabItem value="settings" label="Settings" default>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Key</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell align="right">Required</TableCell>
                                        <TableCell align="right">Fallback</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data.fields.map((field) =>
                                            <TableRow key={field.key}>
                                                <TableCell><CodeInline>{field.key}</CodeInline></TableCell>
                                                <TableCell><PalladiumObjectType type={field.type}/></TableCell>
                                                <TableCell>{field.description}</TableCell>
                                                <TableCell align="center">{field.required ? <Check color={'success'}/> :
                                                    <Close color={'error'}/>}</TableCell>
                                                <TableCell align="right">{field.fallback ?? '/'}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TabItem>
                    }

                    {data.example &&
                        <TabItem value="example" label="Example">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={showAsPower}
                                                                     onChange={(e) => setShowAsPower(e.target.checked)}/>}
                                                  label="Show in full power"/>
                            </FormGroup>

                            <CodeBlock language="json" showLineNumbers>
                                {JSON.stringify(showAsPower ? powerExample : data.example, null, 2)}
                            </CodeBlock>
                        </TabItem>
                    }
                </Tabs>
            }
        </>
    );
}