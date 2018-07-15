const SCREEN_WIDTH = 1280
const SCREEN_HEIGHT = 720

const MAP_HEIGHT = 12
const MAP_WIDTH = 12

const config = {
    type: Phaser.AUTO,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#2d2d2d',
    parent: 'Project Arena',
    scene: {
        preload: preload,
        create: create
    }
};
const game = new Phaser.Game(config);

function convert3dToIsometric(pos) {
    const isopos = {}
    isopos.x = (pos.x - pos.y);
    isopos.y = (pos.x + pos.y) / 2 - pos.z;
    return isopos;
}

function preload() {
    this.load.spritesheet('tile0', 'ressources/sprites/grass.png', {
        frameWidth: 83,
        frameHeight: 96
    });
    this.load.spritesheet('tile1', 'ressources/sprites/box.png', {
        frameWidth: 83,
        frameHeight: 96
    });
    this.load.spritesheet('tile2', 'ressources/sprites/bricks.png', {
        frameWidth: 83,
        frameHeight: 96
    });
}

const map = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const map_textures = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

function create() {
    for (y in map) {
        const row = map[y];
        for (x in row) {
            const z = row[x]
            for (let i = 0; i <= z; i++) {
                const isopos = convert3dToIsometric({
                    x: parseInt(x),
                    y: parseInt(y),
                    z: parseInt(i)
                })
                this.add.sprite(SCREEN_WIDTH / 2 + isopos.x * (83 / 2), SCREEN_HEIGHT / 6 + isopos.y * (96 / 2), 'tile' + map_textures[y][x]);    
            }
        }
    }
}