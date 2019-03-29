define([
        '../Core/Check',
        '../Core/freezeObject',
        './Cesium3DTilesetMostDetailedTraversal',
        './Cesium3DTilesetTraversal'
    ], function(
        Check,
        freezeObject,
        Cesium3DTilesetMostDetailedTraversal,
        Cesium3DTilesetTraversal) {
    'use strict';

    /**
     * The pass in which a 3D Tileset is updated.
     *
     * @private
     */
    var Cesium3DTilePass = {
        RENDER : 0,
        PICK : 1,
        SHADOW : 2,
        PRELOAD : 3,
        PRELOAD_FLIGHT : 4,
        MOST_DETAILED_PRELOAD : 5,
        MOST_DETAILED_PICK : 6,
        NUMBER_OF_PASSES : 7
    };

    var passOptions = new Array(Cesium3DTilePass.NUMBER_OF_PASSES);

    passOptions[Cesium3DTilePass.RENDER] = freezeObject({
        traversal : Cesium3DTilesetTraversal,
        isRender : true, // Do out-of-core operations (cache removal, process new tiles) only during the render pass.
        requestTiles : true,
        ignoreCommands : false
    });

    passOptions[Cesium3DTilePass.PICK] = freezeObject({
        traversal : Cesium3DTilesetTraversal,
        isRender : false,
        requestTiles : false,
        ignoreCommands : false
    });

    passOptions[Cesium3DTilePass.SHADOW] = freezeObject({
        traversal : Cesium3DTilesetTraversal,
        isRender : false,
        requestTiles : true,
        ignoreCommands : false
    });

    passOptions[Cesium3DTilePass.PRELOAD] = freezeObject({
        traversal : Cesium3DTilesetTraversal,
        isRender : false,
        requestTiles : true,
        ignoreCommands : true
    });

    passOptions[Cesium3DTilePass.PRELOAD_FLIGHT] = freezeObject({
        traversal : Cesium3DTilesetTraversal,
        isRender : false,
        requestTiles : true,
        ignoreCommands : true
    });

    passOptions[Cesium3DTilePass.MOST_DETAILED_PRELOAD] = freezeObject({
        traversal : Cesium3DTilesetMostDetailedTraversal,
        isRender : false,
        requestTiles : true,
        ignoreCommands : true
    });

    passOptions[Cesium3DTilePass.MOST_DETAILED_PICK] = freezeObject({
        traversal : Cesium3DTilesetMostDetailedTraversal,
        isRender : false,
        requestTiles : false,
        ignoreCommands : false
    });

    Cesium3DTilePass.getPassOptions = function(pass) {
        return passOptions[pass];
    };

    return freezeObject(Cesium3DTilePass);
});
