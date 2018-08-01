const SCREEN_WIDTH = 1280
const SCREEN_HEIGHT = 720

const MAP_HEIGHT = 12
const MAP_WIDTH = 12

const ORIGIN = {
    X: SCREEN_WIDTH / 2,
    Y: SCREEN_HEIGHT / 6
}

const config = {
    type: Phaser.AUTO,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#2d2d2d',
    parent: 'Project Arena',
    scene: {
        preload: preload,
        create: create,
        update: update
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
    [2, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0],
    [2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0],
    [2, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0],
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
    initializeMap(this)
    initializePlayer(this)
}

function update() {
    if (game.input.activePointer.isDown) {
        console.log("plop")
    }
}

function initializePlayer(self) {
    const pos = {x: 5, y:5, z:0}
    const isopos = convert3dToIsometric(pos)
    self.player = {
        pos,
        sprite: self.add.sprite(SCREEN_WIDTH / 2 + isopos.x * (83 / 2), SCREEN_HEIGHT / 6 + isopos.y * (96 / 2), 'player')
    }
}

function initializeMap(self) {
    self.map = {
        cells: []
    };
    for (y in map) {
        const row = map[y];
        for (x in row) {
            const z = row[x]
            for (let i = 0; i <= z; i++) {
                const pos = {
                    x: parseInt(x),
                    y: parseInt(y),
                    z: parseInt(i)
                }
                if (pos.z == -1)
                    continue;
                const isopos = convert3dToIsometric(pos)
                const cell = {
                    pos,
                    sprite: self.add.sprite(ORIGIN.X + isopos.x * (83 / 2), ORIGIN.Y + isopos.y * (96 / 2), 'tile' + map_textures[y][x]).setInteractive()
                }
                cell.sprite.tint = 0xdddddd;
                self.map.cells.push(cell)
                cell.sprite.on('pointerover', (_) => {
                    self.selectedCell = cell
                    cell.sprite.tint = 0xffffff;
                });
                cell.sprite.on('pointerout', (_) => {
                    cell.sprite.tint = 0xdddddd;
                });
                cell.sprite.input.pixelPerfectOver = true;
            }
        }
    }
}