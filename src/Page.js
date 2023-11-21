import React from 'react';
import Konva from 'konva';

const stage = new Konva.Stage({
    width: 500,
    height: 500,
});

var layer = new Konva.layer();
var circle = new Konva.Circle({
    x: 100,
    radius: 40,
    fill: "blue"
});
layer.add(circle);
stage.add(layer);



function Page() {



    return (
        <stage>
            <layer>

                <circle
                    circle

                />
            </layer>
        </stage>
    );

}

export default Page;